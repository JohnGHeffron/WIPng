import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SiteComponent } from './site/site.component';
import { ApiService } from './api.service';
import { AppStateService } from './app-state.service';
import { ConfigService } from './config.service';
import { WorkcenterComponent } from './workcenter/workcenter.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobListItemComponent } from './job-list-item/job-list-item.component';
import { OperatorComponent } from './operator/operator.component';
import { CommandMenuComponent } from './command-menu/command-menu.component';
import { NotImplementedComponent } from './commands/notimplemented.component';
import { CommandModalComponent } from './commands/command-modal/command-modal.component';
import { RecordQuantityComponent } from './commands/record-quantity/record-quantity.component';
import { ChangeStatusComponent } from './commands/change-status/change-status.component';
import { ProductionReceiptComponent } from './commands/production-receipt/production-receipt.component';
import { ShopPacketComponent } from './commands/shop-packet/shop-packet.component';
import { StartLaborComponent } from './commands/start-labor/start-labor.component';
import { NotifierComponent } from './notifier/notifier.component';

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
  providers: [ApiService, AppStateService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
