import {AppStateService} from '../app-state.service';
import * as moment from 'moment';

export abstract class WipTransaction {
  uuid: string;
  readonly type: string;
  readonly subType: string;
  workCenterId: number;
  employeeId: number;
  jobId: number;
  time: any; //? 

  constructor( appState: AppStateService, type?: string, subType?: string ) {
    this.type = type;
    this.subType = subType;
    this.workCenterId = appState.workcenter.id;
    this.employeeId = appState.operator.id;
    this.jobId = appState.job;
    this.time = moment().format();
  }
}