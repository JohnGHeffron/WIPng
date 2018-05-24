import { CommandName } from './app_objects/command-name.enum';
import { Routes, RouterModule } from '@angular/router';
import { RecordQuantityComponent } from './command-components/record-quantity/record-quantity.component';
import { ChangeStatusComponent } from './command-components/change-status/change-status.component';
import { ProductionReceiptComponent } from './command-components/production-receipt/production-receipt.component';
import { ShopPacketComponent } from './command-components/shop-packet/shop-packet.component';
import { NotImplementedComponent } from './command-components/notimplemented.component';
import { StartLaborComponent } from './command-components/start-labor/start-labor.component';

const routes: Routes = [
  {path: CommandName.RecordPieces, component: RecordQuantityComponent },
  {path: CommandName.ChangeStatus, component: ChangeStatusComponent },
  {path: CommandName.ProdReceipt, component: ProductionReceiptComponent },
  {path: CommandName.ShopPacket, component: ShopPacketComponent },
  {path: CommandName.StartRun, component: StartLaborComponent},
  {path: '**', component: NotImplementedComponent}  // ChangeStatusComponent }
];

export const routing = RouterModule.forRoot(routes);
