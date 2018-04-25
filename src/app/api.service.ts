import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';
import * as moment from 'moment';

@Injectable()
export class ApiService {

  SETUP = 'setup';
  RUN = 'run';
  INDIRECT = 'IndirectProductionOrderLabor';
  START_LABOR = 'StartLabor';
  STOP_LABOR = 'StopLabor';

  uuidv1;

  constructor(private appState: AppStateService) { //private uuidv1: () => string, private moment: Moment, 
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

  getSites = () => { return fetch("http://localhost/mes/api/sites"); }

  getWorkcenters = (siteId) => { return fetch(`http://localhost/mes/api/Workcenters?siteId=${siteId}`) };
  

  // Note: the list of jobs depends on employee as well as workcenter, because job types might be filtered
  //       by employee (a particular employee may be limited to viewing just a few job types)
  // ...BUT it does not appear to be working as intended. We are passing an id, not a badge number. Default
  // id is -1, which is not a valid badge. We should not get any jobs, but we get the entire list.
  getJobs = (workCenterId, operatorId) => {
    return fetch(`http://localhost/mes/api/Workcenters/ProductionOrders?workcenterId=${workCenterId}&employeeBadge=${operatorId}`);
  }
 
  getJobDetails = (wkctrId, orderId) => {
    return fetch(`http://localhost/mes/api/Workcenters/ProductionOrderDetails?workcenterId=${wkctrId}&orderId=${orderId}`);
  }

  getOperators = () => {
    return fetch("http://localhost/mes/api/employees");
  }

  getCommands = (workCenterId, orderId, employeeId) => {
    return fetch(`http://localhost/mes/api/Workcenters/GetMenu?workcenterId=${workCenterId}&orderId=${orderId}&employeeId=${employeeId}`);
  }

  testMoment = () => { console.log( moment().format()); }

  sendStartTransaction = (startType: string, expires: boolean) => {
    this.sendTransaction({
      'uuid': this.uuidv1(),
      'type': this.START_LABOR,
      'subType': startType,
      'workcenterid': this.appState.workcenter.id,
      'employeeId': this.appState.operator.id,
      'jobId': this.appState.job,
      'time': moment().format()
    });
    }

  sendTransaction = function (transaction) {
    return this.sendTransactionNoSync(transaction);
    // if ('serviceWorker' in navigator && 'SyncManager' in window) {
    //   return sendTransactionSync(transaction);
    // } else {
    //   return sendTransactionNoSync(transaction);
    // }
  }

//   function wait(ms){
//     var start = new Date().getTime();
//     var end = start;
//     while(end < start + ms) {
//       end = new Date().getTime();
//    }
//  }

  // var sendTransactionSync = function(trans) {
  //   //idbKeyval.set('sendTransaction', trans)
  //   return idbKeyval.set(trans.uuid, trans)
  //   .then( function() {return navigator.serviceWorker.ready;})
  //   .then( function(sw) {
  //     // KLUDGE! Programming a wait b/c I can't get notification
  //     // from the service worker when it actually performs the sync!
  //     var register = sw.sync.register('sync-sendTransaction');
  //     wait(1500);
  //     return register;
  //     //return sw.sync.register('sync-sendTransaction');
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   })
  // };

  sendTransactionNoSync = function (trans) {
      let ok;
      return fetch('http://localhost/mes/api/labortransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(trans)
      })
      .then(function(response){
        ok = response.ok;
        if (!ok) {
          console.log('Response problem', response);
        }
        return response.json();
      })
      .then(function(data){
        console.log(data);
        return {"ok": ok, "message": data};
      })
      .catch(function(err){
        console.log(err);
        return err;
      })
    };
}
