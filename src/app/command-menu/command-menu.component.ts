import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from '../api.service';
import { AppStateService } from '../app-state.service';
import { Workcenter } from '../workcenter';
import { Operator } from '../operator';
import { WipCommand } from '../wip-command';
import { WipCommandFactory } from '../wip-command-factory';

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

  workcenterSubscription: Subscription;
  operatorSubscription: Subscription;
  jobSubscription: Subscription;

  private commands: WipCommand[];
  // private currentWorkcenter: Workcenter;    //NOTE: NO STATE IN COMPONENT; USE APPSTATE!!
  // private currentOperator: Operator;
  // private jobId: number;

  constructor(private apiService: ApiService, private appState: AppStateService) {
    this.workcenterSubscription = appState.workcenterChanged.subscribe(
      workcenter => { 
        // this.currentWorkcenter = workcenter;
        this.loadCommands()
    });
    this.operatorSubscription = appState.operatorChanged.subscribe(
      operator => { 
        // this.currentOperator = operator;
        this.loadCommands(); 
    });
    this.jobSubscription = appState.jobChanged.subscribe(
      job => { 
        // this.jobId = job;
        this.loadCommands(); }
    )
  }

  loadCommands() {
    if ( this.appState.workcenter 
          && this.appState.operator 
          && this.appState.job) {
      this.apiService.getCommands( this.appState.workcenter.id, 
            this.appState.job, this.appState.operator.id)
      .then( (response) => {return response.json(); })
      .then( (data) => {
        //this.commands = data.map(d => new WipCommand(d.caption, d.enabled, d.expires));
        let factory: WipCommandFactory = new WipCommandFactory();
        this.commands = data.map(d => factory.makeWipCommand(d.caption, d.enabled, d.expires));
        //this.commands.forEach( cmd => console.log(cmd));
        // console.log(this.commands[0]);
        // console.log(this.commands[0].route);
      })
    }
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.workcenterSubscription.unsubscribe();
    this.operatorSubscription.unsubscribe();
    this.jobSubscription.unsubscribe();
  }

}
