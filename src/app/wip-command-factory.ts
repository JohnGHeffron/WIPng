import { WipCommand } from './wip-command';
import { CommandName } from './command-name.enum';

export class WipCommandFactory {

  makeWipCommand(caption: string, enabled: boolean, expires: boolean): WipCommand {
    let cmd: WipCommand = new WipCommand(caption, enabled, expires);
    cmd.hasUI = !this.noUI(cmd.name);
    cmd.subcommands = this.subcommands(cmd.name);
    return cmd;
  }

  private noUI(cmdName: CommandName): boolean {
    return cmdName === CommandName.StartIndirect || 
           cmdName === CommandName.StartRun || 
           cmdName === CommandName.StartSetup;
  }

  private subcommands(cmdName: CommandName): CommandName[] {
    switch (cmdName) {
      case CommandName.Stop:
        return [ CommandName.RecordPieces, 
                 CommandName.ChangeStatus,
                 CommandName.ProdReceipt];
      default:
        return [];
    }
  }
}