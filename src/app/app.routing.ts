import { Routes, RouterModule } from '@angular/router';
import { StopLaborCommandComponent } from './commands/stoplabor-command/stoplabor-command.component';
import { NotImplementedComponent } from './commands/notimplemented.component';

const routes: Routes = [
  {path: 'stop', component: StopLaborCommandComponent },
  {path: '**', component: NotImplementedComponent}
];

export const routing = RouterModule.forRoot(routes);
