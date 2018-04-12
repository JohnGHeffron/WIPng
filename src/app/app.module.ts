import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SiteComponent } from './site/site.component';
//import { RouterModule, Routes } from '@angular/router';

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
import { routing } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StartLaborComponent } from './commands/start-labor/start-labor.component';
import { NullCommandComponent } from './commands/null-command/null-command.component';
import { AppModalComponent, AppModalContent } from './app-modal/app-modal.component';
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
    StartLaborComponent,
    NullCommandComponent,
    AppModalContent,
    AppModalComponent,
    Modal2Component
  ],
  entryComponents: [AppModalContent],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    routing, 
    NgbModule.forRoot() //, RouterModule  
  ],
  providers: [ApiService, AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
