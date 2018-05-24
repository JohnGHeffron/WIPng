import { WipTransaction } from './WipTransaction';

export abstract class StartLaborTransaction extends WipTransaction {
  readonly type: string = "StartLabor";
}