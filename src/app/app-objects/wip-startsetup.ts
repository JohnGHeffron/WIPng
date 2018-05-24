import { WipCommand } from "./wip-command";
import { CommandName } from "./command-name.enum";
import { StartSetupTransaction } from './StartSetupTransaction';

export class WipStartSetup extends WipCommand {

  commandName: CommandName = CommandName.StartSetup;

  routes = [];

  run = () => { 
    this.apiService.sendWipTransaction(new StartSetupTransaction(this.appState), this.expires);
    console.log("Start setup.");
  };

}