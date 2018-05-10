import { StartLaborTransaction } from './StartLaborTransaction';

export class StartSetupTransaction extends StartLaborTransaction {
  readonly subType: string = "setup";
}