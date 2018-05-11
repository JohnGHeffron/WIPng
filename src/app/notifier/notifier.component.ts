import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AppStateService } from '../app-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifier',
  template: `<div *ngIf="message" 
      [@showHide]="'now'" 
      [ngClass]="currentClasses">{{message}}</div>`,
  styleUrls: ['./notifier.component.css'],
  animations: [
    trigger('showHide', [
      state('now', style({opacity: 1})),
      transition('void => *', [
        style({opacity: 0}),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s 0.1s ease-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class NotifierComponent implements OnDestroy {

  message: string;
  isError: boolean = true;
  currentClasses: {};
  subscription: Subscription;

  constructor(private appState: AppStateService) { 
    this.subscription = appState.newApiResult.subscribe(
      notify => {
        this.isError = !notify.ok;
        this.message = notify.message;
        this.setCurrentClasses();
        setTimeout(() => {this.message = null;}, 5000);
      } 
    )
  }

  setCurrentClasses() {
    this.currentClasses = {'message': true, 'error': this.isError, 'info': !this.isError};
  } 

  // ngOnInit() {
  //   setTimeout(() => {
  //     this.appState.apiResult = { ok: true, message: "Transaction succeeded for operator 110"};
  //   }, 1000);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
