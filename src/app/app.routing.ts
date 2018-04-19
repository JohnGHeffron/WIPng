import { Routes, RouterModule } from '@angular/router';
import { StopLaborCommandComponent } from './commands/stoplabor-command/stoplabor-command.component';
import { RecordQuantityComponent } from './commands/record-quantity/record-quantity.component';
import { ChangeStatusComponent } from './commands/change-status/change-status.component';
import { ProductionReceiptComponent } from './commands/production-receipt/production-receipt.component';
import { NotImplementedComponent } from './commands/notimplemented.component';

const routes: Routes = [
  {path: 'stop', component: StopLaborCommandComponent },
  {path: 'record-pieces', component: RecordQuantityComponent },
  {path: 'change-status', component: ChangeStatusComponent },
  {path: 'prod-receipt', component: ProductionReceiptComponent },
  {path: '**', component:  ChangeStatusComponent } //NotImplementedComponent}
];

export const routing = RouterModule.forRoot(routes);
