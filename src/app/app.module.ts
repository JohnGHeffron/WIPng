import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SiteComponent } from './site/site.component';

import { ApiService } from './api.service';
import { AppStateService } from './app-state.service';
import { WorkcenterComponent } from './workcenter/workcenter.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobListItemComponent } from './job-list-item/job-list-item.component';
import { OperatorComponent } from './operator/operator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommandMenuComponent } from './command-menu/command-menu.component';
import { CommandComponent } from './command/command.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Modal2Component } from './modal2/modal2.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    WorkcenterComponent,
    JobDetailComponent,
    JobListComponent,
    JobListItemComponent,
    OperatorComponent,
    CommandMenuComponent,
    CommandComponent,
    Modal2Component
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    NgbModule.forRoot()  
  ],
  providers: [ApiService, AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
