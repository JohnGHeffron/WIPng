import { Component, OnDestroy, Input, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from '../api.service';
import { AppStateService } from '../app-state.service';
import { Workcenter } from '../workcenter';

@Component({
  selector: 'app-workcenter',
  template: `  <select id="workcenterSelect" #workcenterSelect 
    (change)="onChange(workcenterSelect.selectedOptions[0].index)">
  <option *ngFor="let wkctr of workcenters" class="siteOption" value="{{wkctr.id}}"> 
    {{ wkctr.displayName }}
  </option>
 </select>`,
  styleUrls: ['./workcenter.component.css']
})
export class WorkcenterComponent implements OnDestroy {

  @Input() siteId: number;
  subscription: Subscription;

  workcenters: Workcenter[];
  currentWorkcenter: Workcenter;  //TODO: this is (probably) redundant. Can we get it from AppStateService?
  
  constructor( private apiService: ApiService, private appState: AppStateService) { 
    this.subscription = this.appState.siteChanged.subscribe(
      site => {
        console.log('changing to site:', site);
        this.siteId = site.id; 
        this.loadWorkcenterList(this.siteId);
      }
    )
  }

  onChange(index: number) {
    this.currentWorkcenter = this.workcenters[index]
    this.appState.workcenter = this.currentWorkcenter;
  }

  loadWorkcenterList(siteId: number) {
    this.apiService.getWorkcenters(siteId)
    .then((response) => response.json())
    .then((data) => {
      this.workcenters = data;
      this.currentWorkcenter = this.workcenters[0];
      this.appState.workcenter = this.currentWorkcenter;
    });
  }

  // ngOnInit() {
  //   this.loadWorkcenterList(this.siteId);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
