import { WipCommand } from './wip-command';
import { CommandName } from './command-name.enum';
import { Command } from 'protractor';

export class WipCommandFactory {

  makeWipCommand(caption: string, enabled: boolean, expires: boolean): WipCommand {
    let cmd: WipCommand = new WipCommand(caption, enabled, expires);
    cmd.run = this.run(cmd.commandName);
    cmd.routes = this.subcommands(cmd.commandName);
    return cmd;
  }

  private run(cmdName: CommandName): () => void {
    switch (cmdName) {
      case CommandName.StartRun:
        return () => { console.log("Start run.")}
      case CommandName.StartSetup:
        return () => { console.log("Start setup.")}
      case CommandName.StartIndirect:
        return () => { console.log("Start indirect.")}
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