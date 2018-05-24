import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from '../api.service';
import { AppStateService } from '../app-state.service';
import { Workcenter } from '../app-objects/workcenter';
import { Operator } from '../app-objects/operator';
import { WipCommand } from '../app-objects/wip-command';
import { WipCommandFactory } from '../app-objects/wip-command-factory';
import { TransactionState } from '../app-objects/transaction-state.enum';

@Component({
  selector: 'app-command-menu',
  template: `<div>
      <app-command-modal 
        *ngFor="let cmd of commands" [command]="cmd">
      </app-command-modal></div>`,
  //'<div><app-command *ngFor="let cmd of commands" [command]="cmd"></app-command></div>',
  styleUrls: ['./command-menu.component.css']
})
export class CommandMenuComponent implements OnInit, OnDestroy {

  //workcenterSubscription: Subscription;
  operatorSubscription: Subscription;
  jobSubscription: Subscription;
  transactionSubscription: Subscription;
  transactionPending: boolean = false;

  private commands: WipCommand[];
  // private currentWorkcenter: Workcenter;    //NOTE: NO STATE IN COMPONENT; USE APPSTATE!!
  // private currentOperator: Operator;
  // private jobId: number;

  constructor(private apiService: ApiService, private appState: AppStateService, 
        private wipCommandFactory: WipCommandFactory) {
    // DO NOT NEED TO MONITOR WORKCENTER CHANGES: JOB CHANGES SUFFICE. (workcenter change => job change)
    // this.workcenterSubscription = appState.workcenterChanged.subscribe(
    //   workcenter => { 
    //     // this.currentWorkcenter = workcenter;
    //     console.log("command menu: workcenter changed.");
    //     this.loadCommands()
    // });
    this.operatorSubscription = appState.operatorChanged.subscribe(
      operator => { 
        // this.currentOperator = operator;
        console.log("command menu: operator changed.");
        this.loadCommands(); 
    });
    this.jobSubscription = appState.jobChanged.subscribe(
      job => { 
        // this.jobId = job;
        console.log("command menu: job changed.");
        this.loadCommands(); 
    });
    this.transactionSubscription = ApiService.transactionState.subscribe(
      trans => {
        switch (trans) {
          case (TransactionState.complete):
          console.log("command menu: transaction complete.");
          this.transactionPending = false;
          this.loadCommands();
            break;
          case (TransactionState.pending):
          console.log("command menu: transaction pending.");
          this.transactionPending = true;
          this.disableCommands();
            break;
          default:
        }
    });
  }

  loadCommands() {
    if (this.transactionPending) return;

    if ( this.appState.workcenter 
          && this.appState.operator 
          && this.appState.job) {
      this.apiService.getCommands( this.appState.workcenter.id, 
            this.appState.job, this.appState.operator.id)
      .then( (response) => {return response.json(); })
      .then( (data) => {
        //this.commands = data.map(d => new WipCommand(d.caption, d.enabled, d.expires));
        //console.log(data);
        this.commands = data.map(d => this.wipCommandFactory.makeWipCommand(d.caption, d.enabled, d.expires));
      })
      .catch( err => console.log("Error retrieving menu", err));
    }
  }

  disableCommands() {
    this.commands.map( c => c.enabled = false );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    //this.workcenterSubscription.unsubscribe();
    this.operatorSubscription.unsubscribe();
    this.jobSubscription.unsubscribe();
    this.transactionSubscription.unsubscribe();
  }

}
