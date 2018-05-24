import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { ApiService } from './api.service';
import { AppStateService } from './app-state.service';
import { ConfigService } from './config.service';
import { WipCommandFactory } from './app_objects/wip-command-factory';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SiteComponent } from './app-state-components/site/site.component';
import { WorkcenterComponent } from './app-state-components/workcenter/workcenter.component';
import { JobDetailComponent } from './app-state-components/job-detail/job-detail.component';
import { JobListComponent } from './app-state-components/job-list/job-list.component';
import { JobListItemComponent } from './app-state-components/job-list-item/job-list-item.component';
import { OperatorComponent } from './app-state-components/operator/operator.component';
import { CommandMenuComponent } from './command-menu/command-menu.component';
import { NotImplementedComponent } from './command-components/notimplemented.component';
import { CommandModalComponent } from './command-components/command-modal/command-modal.component';
import { RecordQuantityComponent } from './command-components/record-quantity/record-quantity.component';
import { ChangeStatusComponent } from './command-components/change-status/change-status.component';
import { ProductionReceiptComponent } from './command-components/production-receipt/production-receipt.component';
import { ShopPacketComponent } from './command-components/shop-packet/shop-packet.component';
import { StartLaborComponent } from './command-components/start-labor/start-labor.component';
import { NotifierComponent } from './app-state-components/notifier/notifier.component';

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
    NotImplementedComponent,
    CommandModalComponent,
    RecordQuantityComponent,
    ChangeStatusComponent,
    ProductionReceiptComponent,
    ShopPacketComponent,
    StartLaborComponent,
    NotifierComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    routing,
    FormsModule,
    ReactiveFormsModule, 
    NgbModule.forRoot()  
  ],
  providers: [ApiService, AppStateService, ConfigService, WipCommandFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
