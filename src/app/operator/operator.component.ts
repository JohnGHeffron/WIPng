import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
    <input type="text" 
      [formControl]="userInput" 
      [hidden]="currentOperator"
      [value]="badgeValue" 
      />`,
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  private operators: Operator[];
  private currentOperator;
  badgeValue: string = null;

  userInput: FormControl = new FormControl('');

  constructor(private apiService: ApiService, private appState: AppStateService) { 
    this.userInput.valueChanges
      .debounceTime(1000)
      .subscribe( badge => this.findOperator(badge));
  }

  // get currentOperator() { return this._currentOperator; }
  // set currentOperator(value: Operator) {
  //   this._currentOperator = value;
  //   this.appState.setOperator(value);
  // }

  findOperator(badge: string): void {
    let operator = this.operators.find( op => { return op.username === badge } );
    this.currentOperator = operator ? operator : null;
    this.appState.operator = this.currentOperator;
  }

  nameClicked() {
    this.currentOperator = null;
    this.badgeValue = '';
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
