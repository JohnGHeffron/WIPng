import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from '../api.service';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-job-list',
  template: `<app-job-list-item 
              *ngFor="let job of jobs" 
              [job]="job" 
              (jobSelected)="onJobSelected($event)">
            </app-job-list-item>`,
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy {

  jobs: any[];
  _currentJob: any;

  set currentJob(value: any) {
    if (this._currentJob) {this._currentJob.selected = "";}
    // console.log("current: ", this._currentJob);
    // console.log("new: ", value);
    this._currentJob = value;
    this._currentJob.selected = "selected";
    this.appState.job = this._currentJob.orderId;
  }

  get currentJob() {return this._currentJob;}

  subscription: Subscription;

  constructor(private apiService: ApiService, private appState: AppStateService) { 
    this.subscription = this.appState.workcenterChanged.subscribe(
      workcenter => {
        // console.log('detected workcenter change: ', workcenter);
        this.loadJobList(workcenter.id)
      }
    );
  }

  loadJobList(workcenterId) {
    // console.log('load jobs for wkctr id: ', workcenterId);
    this.apiService.getJobs(workcenterId, 11)
    .then( (response) => { return response.json(); })
    .then( (data) => {
      this.jobs = data;
      this.jobs.map( j => j.selected = "");
      this.currentJob = this.jobs[0];
    })
  }

  onJobSelected(job:any) {
    this.currentJob = job;
  }

  ngOnInit() {
    if (this.appState.workcenter) {
      this.loadJobList(this.appState.workcenter.id);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
