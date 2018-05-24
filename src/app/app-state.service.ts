import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Site } from './app-objects/site';
import { Workcenter } from './app-objects/workcenter';
import { Operator } from './app-objects/operator';

@Injectable()
export class AppStateService {

  constructor() { }

  private siteSubject = new Subject<Site>();
  private workcenterSubject = new Subject<Workcenter>();
  private jobSubject = new Subject<number>();
  private operatorSubject = new Subject<Operator>();
  // private apiResultSubject = new Subject<any>();

  private _site: Site;
  private _workcenter: Workcenter;
  private _operator: Operator = new Operator(); // (set a default so menu appears)
  private _job: number;
  // private _apiResult: any;

  siteChanged = this.siteSubject.asObservable();
  workcenterChanged = this.workcenterSubject.asObservable();
  jobChanged = this.jobSubject.asObservable();
  operatorChanged = this.operatorSubject.asObservable();
  // newApiResult = this.apiResultSubject.asObservable();

  set site(newSite: Site) {
    this._site = newSite;
    this.siteSubject.next(newSite);
  }

  get site() {
    return this._site;
  }

  set workcenter(newWorkcenter: Workcenter) {
    this._workcenter = newWorkcenter;
    this.workcenterSubject.next(newWorkcenter);
  }

  get workcenter(): Workcenter {
    return this._workcenter;
  }

  set job(newJobId: number) {
    //console.log("changing job id to ", newJobId);
    if (newJobId !== this._job){
      this._job = newJobId;
      this.jobSubject.next(newJobId);
    }
  }

  get job(): number { return this._job; }

  set operator(newOperator: Operator) {
    this._operator = newOperator ? newOperator : new Operator();
    this.operatorSubject.next(newOperator);
    console.log("operator changed: ", this._operator);
  }

  get operator(): Operator {
    return this._operator;
  }

  // set apiResult(newResult: any) {
  //   this._apiResult = newResult;
  //   this.apiResultSubject.next(newResult);
  // }

  // get apiResult(): any {
  //   return this._apiResult;
  // }
}
