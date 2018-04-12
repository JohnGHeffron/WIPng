import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { AppModalComponent } from './app-modal/app-modal.component';
import { StartLaborComponent } from './commands/start-labor/start-labor.component';
import { NullCommandComponent } from './commands/null-command/null-command.component';

const routes: Routes = [
  {path: 'start-run', component: StartLaborComponent},
  {path: 'my-jobs', component: AppModalComponent},
  {path: '', component: NullCommandComponent} //JobListComponent
];

export const routing = RouterModule.forRoot(routes);