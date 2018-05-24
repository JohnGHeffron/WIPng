import { WipCommand } from "./wip-command";
import { CommandName } from "./command-name.enum";
import { StartRunTransaction } from './StartRunTransaction';

export class WipStartRun extends WipCommand {

  commandName = CommandName.StartRun;

  routes = [];

  run = () => { 
    this.apiService.sendWipTransaction(new StartRunTransaction(this.appState), this.expires);
    console.log("Start run.");
  };

}