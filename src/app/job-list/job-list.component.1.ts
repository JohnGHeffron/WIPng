import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../api.service';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-job-list',
  template: `<div innerHtml="{{jobList}}"></div>`,
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy {

  jobList: string = "";
  subscription: Subscription;

  constructor(private apiService: ApiService, private appStateService: AppStateService) { 
    this.subscription = this.appStateService.workcenterChanged.subscribe(
      workcenter => {
        console.log('detected workcenter change: ', workcenter);
        this.loadJobList(workcenter.id)
      }
    );
  }

  buttonDetail = (job) => 
  { return job.user ? `${job.item} | ${job.user}` : `${job.item}`;};

  infoButton(job, selected) { 
    return `<div class="info-button clearfix ${selected}">
              <div class="info-button--text">
                <div class="info-button--caption">${job.order}</div>
                <div class="info-button--detail">${this.buttonDetail(job)}</div>
              </div>
              <img class="info-button--image" src="${job.i}" />
              <img class="info-button--image" src="${job.s}" />
            </div>`;
  }

  loadJobList(workcenterId) {
    console.log('load jobs for wkctr id: ', workcenterId);
    this.apiService.getJobs(workcenterId, 11)
    .then( (response) => { return response.json(); })
    .then( (data) => {
      this.jobList = "";
      let selected: string = "selected";
      data.forEach(job => {
        this.jobList += this.infoButton(job, selected);
        selected = "";
      });
    })
  }

  ngOnInit() {
    this.loadJobList(7);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
