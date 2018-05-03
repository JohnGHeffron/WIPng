import { WipCommand } from './wip-command';
import { CommandName } from './command-name.enum';
import { ApiService } from './api.service';
//import { Command } from 'protractor';

export class WipCommandFactory {

  constructor(private apiService: ApiService) {  }

  makeWipCommand(caption: string, enabled: boolean, expires: boolean): WipCommand {
    let cmd: WipCommand = new WipCommand(caption, enabled, expires);
    cmd.run = this.run(cmd.commandName, cmd.expires);
    cmd.routes = this.subcommands(cmd.commandName);
    return cmd;
  }

  private run(cmdName: CommandName, expires: boolean): () => void {
    switch (cmdName) {
      case CommandName.StartRun:
        return () => { 
          this.apiService.sendStartRunTransaction(expires);
          console.log("Start run.");
        }
      case CommandName.StartSetup:
        return () => { 
          this.apiService.sendStartSetupTransaction(expires);
          console.log("Start setup.");
        }
      case CommandName.StartIndirect:
        return () => { 
          this.apiService.sendStartIndirectTransaction(expires);
          console.log("Start indirect.");
        }
      case CommandName.Stop:
        return () => {
          this.apiService.sendStopTransaction(expires);
          console.log("Stop labor.");
        }
      default:
        return () => { console.log(`from factory: running ${cmdName}`)};//() => {};
    }
  }

  private subcommands(cmdName: CommandName): CommandName[] {
    switch (cmdName) {
      case CommandName.Stop:
        return [ CommandName.RecordPieces, 
                 CommandName.ChangeStatus,
                 CommandName.ProdReceipt];
      case CommandName.StartRun:
      case CommandName.StartSetup:
      case CommandName.StartIndirect:
        return [];
      default:
        return [cmdName];
    }
  }
}