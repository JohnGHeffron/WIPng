import { WipCommand } from "./wip-command";
import { CommandName } from "./command-name.enum";
import { StopLaborTransaction } from './StopLaborTransaction';

export class WipStopLabor extends WipCommand {

  commandName: CommandName = CommandName.Stop;

  routes = [CommandName.RecordPieces, CommandName.ChangeStatus, CommandName.ProdReceipt];

  run =  () => {
    this.apiService.sendWipTransaction(new StopLaborTransaction(this.appState), this.expires);
    console.log("Stop labor.");
  };
  
}