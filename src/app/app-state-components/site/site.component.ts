import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Site } from '../../app-objects/site';

import { ApiService } from '../../api.service';
import { AppStateService } from '../../app-state.service';

@Component({ 
  selector: 'app-site',
  template: `
  <select id="siteSelect" #siteSelect (change)="onChange(siteSelect.selectedOptions[0].index)">
   <option *ngFor="let site of sites" 
    class="siteOption" 
    ng-select="site.id === appState.site.id"
    value="{{site.id}}"> 
      {{ site.name }} - {{site.description}}
   </option>
  </select>`,
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit, OnDestroy {

  sites: Site[]; 
  subscription: Subscription;

  constructor(private apiService: ApiService, private appState: AppStateService) {
    this.subscription = this.appState.siteChanged.subscribe( 
      site => {
        this.sites = this.sites;
      }
    )
   }

  onChange(index: number) {
    this.appState.site = this.sites[index];
    console.log("site after:", this.appState.site);
  }

  ngOnInit() {
    this.apiService.getSites()
      .then((response) => response.json())
      .then((data) => {
        this.sites = data;
        if (!this.appState.site) {
          this.appState.site = this.sites[0];
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
