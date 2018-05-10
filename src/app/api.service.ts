import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';
import { ConfigService } from './config.service';
import { TransactionState } from './transaction-state.enum';
import { Subject } from 'rxjs/Subject';
import { WipTransaction } from './app_objects/WipTransaction';

import * as moment from 'moment';

@Injectable()
export class ApiService {

  HOST = "localhost"; //"dev-mes-52"; //
  APP = "mes"; //"paperless.web.api"; //

  transactionState: Subject<TransactionState> = new Subject<TransactionState>();

  uuidv1;

  constructor(private appState: AppStateService, private config: ConfigService) { //private uuidv1: () => string, private moment: Moment, 
    // fallback for flaky uuid CDN wzrd.in/standalone/uuid%2Fv1@latest
    if (typeof this.uuidv1 === "undefined") {
      this.uuidv1 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        });
      }
    }  
  }

  private fullUri = ( partial: string ): string => {
    return `${this.config.SCHEME}://${this.config.HOST}/${this.config.APP}/${partial}`;
  }

  getSites = () => { return fetch(this.fullUri('api/sites')); }

  getWorkcenters = (siteId) => { return fetch(this.fullUri(`api/Workcenters?siteId=${siteId}`)); }
  

  // Note: the list of jobs depends on employee as well as workcenter, because job types might be filtered
  //       by employee (a particular employee may be limited to viewing just a few job types)
  // ...BUT it does not appear to be working as intended. We are passing an id, not a badge number. Default
  // id is -1, which is not a valid badge. We should not get any jobs, but we get the entire list.
  getJobs = (workCenterId, operatorId) => {
    return fetch(this.fullUri(`api/Workcenters/ProductionOrders?workcenterId=${workCenterId}&employeeBadge=${operatorId}`));
  }
 
  getJobDetails = (wkctrId, orderId) => {
    return fetch(this.fullUri(`api/Workcenters/ProductionOrderDetails?workcenterId=${wkctrId}&orderId=${orderId}`));
  }

  getOperators = () => {
    return fetch(this.fullUri(`api/employees`));
  }

  getCommands = (workCenterId, orderId, employeeId) => {
    return fetch(this.fullUri(`api/Workcenters/GetMenu?workcenterId=${workCenterId}&orderId=${orderId}&employeeId=${employeeId}`));
  }

  getReasonCodes = function(reasonCodeId) {
    return fetch(this.fullUri(`api/InventoryTransaction/ReasonCodes?transTypeId=${reasonCodeId}`));
  }

  testMoment = () => { console.log( moment().format()); }

  sendWipTransaction = (transaction: WipTransaction, expires: boolean) => {
    this.transactionState.next(TransactionState.pending);
    this.sendTransaction(transaction)
    .then(() => {
      if (expires)
        this.appState.operator = null;
      this.transactionState.next(TransactionState.complete);
    });
  }


  sendTransaction = function (transaction) {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller && 'SyncManager' in window) {
      return this.sendTransactionSync(transaction);
    } else {
      return this.sendTransactionNoSync(transaction);
    }
  }

  private wait =function(ms) {
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  private sendTransactionSync = function(trans) {
    return this.sendTransactionNoSync(trans);
    // CAN'T DO THE FOLLOWING IN ANGULAR YET:
    // return idbKeyval.set(trans.uuid, trans)
    // .then( function() {return navigator.serviceWorker.ready;})
    // .then( function(sw) {
    //   // KLUDGE! Programming a wait b/c I can't get notification
    //   // from the service worker when it actually performs the sync!
    //   var register = sw.sync.register('sync-sendTransaction');
    //   this.wait(1500);
    //   return register;
    //   //return sw.sync.register('sync-sendTransaction');
    // })
    // .catch(function(err) {
    //   console.log(err);
    // })
  };

  private sendTransactionNoSync = function (trans) {
      let ok;
      return fetch(this.fullUri(`api/labortransaction`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(trans)
      })
      .then(function(response){
        ok = response.ok;
        if (ok) {
          console.log('transaction sent.');
        } else {
          console.log('failed:', response);
        }
        return response.json();
      })
      .then(function(data){
        console.log(data);
        // TODO: showResult(ok, data.message);
        return {"ok": ok, "message": data};
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
    };
}
