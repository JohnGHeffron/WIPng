import { CommandName } from './command-name.enum';
import { Routes, RouterModule } from '@angular/router';
import { StopLaborCommandComponent } from './commands/stoplabor-command/stoplabor-command.component';
import { RecordQuantityComponent } from './commands/record-quantity/record-quantity.component';
import { ChangeStatusComponent } from './commands/change-status/change-status.component';
import { ProductionReceiptComponent } from './commands/production-receipt/production-receipt.component';
import { ShopPacketComponent } from './commands/shop-packet/shop-packet.component';
import { NotImplementedComponent } from './commands/notimplemented.component';
import { StartLaborComponent } from './commands/start-labor/start-labor.component';

const routes: Routes = [
  {path: CommandName.Stop, component: StopLaborCommandComponent },
  {path: CommandName.RecordPieces, component: RecordQuantityComponent },
  // {path: CommandName.RecordPieces, component: RecordQuantityComponent, outlet: 'workflow' },
  {path: CommandName.ChangeStatus, component: ChangeStatusComponent },
  {path: CommandName.ProdReceipt, component: ProductionReceiptComponent },
  {path: CommandName.ShopPacket, component: ShopPacketComponent },
  {path: CommandName.StartRun, component: StartLaborComponent},
  {path: '**', component: NotImplementedComponent}  // ChangeStatusComponent }
];

export const routing = RouterModule.forRoot(routes);
