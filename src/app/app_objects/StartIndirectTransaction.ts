import { StartLaborTransaction } from './StartLaborTransaction';

export class StartIndirectTransaction extends StartLaborTransaction {
  readonly subType: string = "IndirectProductionOrderLabor";
}