import { Component, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from '../api.service';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-job-detail',
  template: '<div innerHtml={{content}}></div>',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnDestroy {

  private workcenterId: number;
  private jobId: number;
  private subscription; Subscription;

  content: string; 

  constructor(private apiService: ApiService, private appState: AppStateService) { 
    this.subscription = this.appState.jobChanged.subscribe(
      jobId => { 
        this.jobId = jobId;
        this.workcenterId = appState.workcenter.id;
        this.loadJobDetails();
      }
    );
  }

  loadJobDetails() {
    if (this.workcenterId && this.jobId)
    {
      this.apiService.getJobDetails(this.workcenterId, this.jobId)
      .then((response) => response.text())
      .then((data) => this.content = data);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
