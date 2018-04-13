import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SiteComponent } from './site/site.component';
import { ApiService } from './api.service';
import { AppStateService } from './app-state.service';
import { WorkcenterComponent } from './workcenter/workcenter.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobListItemComponent } from './job-list-item/job-list-item.component';
import { OperatorComponent } from './operator/operator.component';
import { CommandMenuComponent } from './command-menu/command-menu.component';
import { Modal2Component } from './modal2/modal2.component';
import { NotImplementedComponent } from './commands/notimplemented.component';
import { CommandModalComponent } from './commands/command-modal/command-modal.component';
import { StopLaborCommandComponent } from './commands/stoplabor-command/stoplabor-command.component';

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
    Modal2Component,
    NotImplementedComponent,
    CommandModalComponent,
    StopLaborCommandComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    routing,
    ReactiveFormsModule, 
    NgbModule.forRoot()  
  ],
  providers: [ApiService, AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
