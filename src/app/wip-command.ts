import { CommandName } from './command-name.enum';

export class WipCommand {
  caption: string;
  commandName: CommandName;
  enabled: boolean;
  expires: boolean;
  //name: CommandName;
  //hasUI: boolean;
  run: () => void;
  routes: CommandName[]=[];
  
  constructor(caption: string, enabled: boolean, expires: boolean){
    this.caption = caption;
    this.enabled = enabled;
    this.expires = expires;
    this.commandName = CommandName[this.caption.replace(" ", "")];
    this.routes[0] = this.commandName;
    // this.run = () => { console.log(`running ${this.caption}`)};
  }

  // get route(): string {
  //   return this.caption.replace(" ","-").toLowerCase();
  // }
}
