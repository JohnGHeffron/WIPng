import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppStateService } from './app-state.service';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs';
import { Site } from './app_objects/site';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private appState: AppStateService, private apiService: ApiService ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParamMap.subscribe( 
      parms => { 
        console.log(parms);
        if (parms.has('siteId') && parms.get('siteId') !== null) {
          var siteId: number = Number.parseInt(parms.get('siteId'));
          //console.log("site id:", siteId);
          this.apiService.getSite(siteId)
          .then( response => {return response.json();} )
          .then( data => { this.appState.site = data;});
        }
       });
    // if ('wkctrId' in parms && parms['wkctrId'] !== null) {
    //   var id = parms['wkctrId']
    //   this.appState.workcenter; 
    //   this.apiService.getAllWorkcenters()
    //   .then( response => { return response.json(); })
    //   .then( data => {
    //     data.find( w => w.id === id)
    //   }) ;
    // }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
