import { Injectable } from '@angular/core';

import { WipCommand } from './wip-command';
import { CommandName } from './command-name.enum';
import { ApiService } from './api.service';
import { StartRunTransaction } from './app_objects/StartRunTransaction';
import { StartSetupTransaction } from './app_objects/StartSetupTransaction';
import { StartIndirectTransaction } from './app_objects/StartIndirectTransaction';
import { StopLaborTransaction } from './app_objects/StopLaborTransaction';
import { AppStateService } from './app-state.service';

@Injectable()
export class WipCommandFactory {

  constructor(private apiService: ApiService, 
            private appState: AppStateService) {  }

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
          this.apiService.sendWipTransaction(
            new StartRunTransaction(this.appState), expires);
          console.log("Start run.");
        }
      case CommandName.StartSetup:
        return () => { 
          this.apiService.sendWipTransaction(
            new StartSetupTransaction(this.appState), expires);
          console.log("Start setup.");
        }
      case CommandName.StartIndirect:
        return () => { 
          this.apiService.sendWipTransaction(
            new StartIndirectTransaction(this.appState), expires);
          console.log("Start indirect.");
        }
      case CommandName.Stop:
        return () => {
          this.apiService.sendWipTransaction(
            new StopLaborTransaction(this.appState), expires);
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