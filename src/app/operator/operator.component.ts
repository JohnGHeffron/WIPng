import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { ApiService } from '../api.service';
import { AppStateService } from '../app-state.service';
import { Operator } from '../operator';

@Component({
  selector: 'app-operator',
  template: `Operator: <span id="operatorLabel" 
    [hidden]="!currentOperator" 
    (click)="nameClicked()">
      {{fullName}}
    </span> 
    <input type="text" size="7"
      [formControl]="userInput" 
      [hidden]="currentOperator"
      />`,      //#userInput="ngModel"
      styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  private operators: Operator[];
  @Input() currentOperator: Operator;
  private subscription: Subscription;
  //@ViewChild('userInput') userInputFld: ElementRef;

  userInput: FormControl = new FormControl('');

  constructor(private apiService: ApiService, private appState: AppStateService) { 
    this.userInput.valueChanges
      .debounceTime(1000)
      .subscribe( badge => this.findOperator(badge));
    this.subscription = this.appState.operatorChanged.subscribe(
      operator => {
        //console.log('changing to operator:', operator);
        this.currentOperator = operator;
      });
    appState.operator = null;
    }

  findOperator(badge: string): void {
    let operator = this.operators.find( op => { return op.username === badge } );
    this.userInput.setValue('',{});
    this.appState.operator = operator; //this.currentOperator;
  }

  nameClicked() {
    this.currentOperator = null;
    //this.userInputFld.nativeElement.focus();
  }

  get fullName() {
    return this.currentOperator ? this.currentOperator.fullName : '';
  }

  ngOnInit() {
    this.apiService.getOperators()
    .then( response => {return response.json()})
    .then( data => this.operators = data)
  }

}
