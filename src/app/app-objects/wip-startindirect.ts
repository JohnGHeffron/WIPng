import { WipCommand } from "./wip-command";
import { CommandName } from "./command-name.enum";
import { StartIndirectTransaction } from './StartIndirectTransaction';

export class WipStartIndirect extends WipCommand {

  commandName: CommandName = CommandName.StartIndirect;

  routes = [];

  run = () => { 
    this.apiService.sendWipTransaction(new StartIndirectTransaction(this.appState), this.expires);
    console.log("Start indirect.");
  };

}