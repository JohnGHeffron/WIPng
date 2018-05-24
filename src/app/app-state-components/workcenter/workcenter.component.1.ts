import { Component, OnInit, OnChanges,Input, SimpleChange } from '@angular/core';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-workcenter',
  template: `  <select id="workcenterSelect">
  <option *ngFor="let wkctr of workcenters" class="siteOption" value="{{wkctr.id}}"> 
    {{ wkctr.displayName }}
  </option>
 </select>`,
  styleUrls: ['./workcenter.component.css']
})
export class WorkcenterComponent implements OnInit {

  @Input() siteId: number;

  workcenters: any[];
  
  constructor( private apiService: ApiService) { }

  setWorkcenters(siteId: number) {
    this.apiService.getWorkcenters(siteId)
    .then((response) => response.json())
    .then((data) => this.workcenters = data);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes);
    console.log(changes['siteId'].currentValue);
    this.setWorkcenters(changes['siteId'].currentValue);
  }

  ngOnInit() {
    this.setWorkcenters(this.siteId);
    // this.apiService.getWorkcenters(this.siteId)
    // .then((response) => response.json())
    // .then((data) => this.workcenters = data);
  }

}
