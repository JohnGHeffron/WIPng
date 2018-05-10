import { StartLaborTransaction } from './StartLaborTransaction';

export class StartRunTransaction extends StartLaborTransaction {
  readonly subType: string = "run";
}