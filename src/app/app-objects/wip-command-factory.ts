import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { AppStateService } from '../app-state.service';

import { CommandName } from './command-name.enum';
import { WipCommand } from './wip-command';
import { WipStartRun } from './wip-startrun';
import { WipStartSetup } from './wip-startsetup';
import { WipStartIndirect } from './wip-startindirect';
import { WipStopLabor } from './wip-stoplabor';

@Injectable()
export class WipCommandFactory {

  private commands: WipCommand[] = [];

  constructor(private apiService: ApiService, private appState: AppStateService) { 
    this.commands = [
      new WipStartRun("", false, false, appState, apiService),
      new WipStartSetup("", false, false, appState, apiService),
      new WipStartIndirect("", false, false, appState, apiService),
      new WipStopLabor("", false, false, appState, apiService)
    ] 
    console.log(this.commands);
   }

  makeWipCommand(caption: string, enabled: boolean, expires: boolean): WipCommand {
    let cmd: WipCommand  =  this.commands.find( x => x.commandName === CommandName[caption.replace(" ", "").replace("/","")] );
    if (cmd) {
      cmd.caption = caption;
      cmd.enabled = enabled;
      cmd.expires = expires;
    } 
    else {
      cmd = new WipCommand(caption, enabled, expires, this.appState, this.apiService);
      this.commands.push(cmd);
    }
    console.log(this.commands.length);
    return cmd;
  }
}