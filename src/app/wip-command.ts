import { CommandName } from './command-name.enum';

export class WipCommand {
  caption: string;
  enabled: boolean;
  expires: boolean;
  name: CommandName;
  hasUI: boolean;
  subcommands: CommandName[];
  
  constructor(caption: string, enabled: boolean, expires: boolean){
    this.caption = caption;
    this.enabled = enabled;
    this.expires = expires;
    this.name = CommandName[this.caption.replace(" ", "")];
  }

  get route(): string {
    return this.caption.replace(" ","-").toLowerCase();
  }
}
