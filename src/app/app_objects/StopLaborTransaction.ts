import { WipTransaction } from './WipTransaction';

export class StopLaborTransaction extends WipTransaction {
  readonly type: string = "StopLabor";
}