import { Component, OnInit } from '@angular/core';
import { Site } from '../site';

import { ApiService } from '../api.service';

@Component({ 
  selector: 'app-site',
  template: `
  <select id="siteSelect" #siteSelect (change)="onChange(siteSelect.selectedOptions[0].index)">
   <option *ngFor="let site of sites" 
    class="siteOption" 
    value="{{site.id}}"> 
      {{ site.name }} - {{site.description}}
   </option>
  </select>
  <app-workcenter [siteId]="currentSite.id"></app-workcenter>`,
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  sites: Site[]; 
  currentSite: Site = {id: 1, name: null, description: null};

  constructor(private apiService: ApiService) { }

  onChange(index: number) {
    //console.log("site before:", this.currentSite);
    // the following line was used when $event was passed from the template:
    //let index: number = event.srcElement.selectedOptions[0].index;
    this.currentSite = this.sites[index];
    console.log("site after:", this.currentSite);
  }

  ngOnInit() {
    this.apiService.getSites()
      .then((response) => response.json())
      .then((data) => {
        this.sites = data;
        this.currentSite = this.sites[0];
      });
  }

}
