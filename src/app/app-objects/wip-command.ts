import { CommandName } from './command-name.enum';
import { AppStateService } from '../app-state.service';
import { ApiService } from '../api.service';

export class WipCommand {
  caption: string;
  commandName: CommandName;
  enabled: boolean;
  expires: boolean;
  //name: CommandName;
  //hasUI: boolean;
  run: () => void;
  routes: CommandName[]=[];
  
  constructor(caption: string, enabled: boolean, expires: boolean, 
          protected appState: AppStateService, protected apiService: ApiService){
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
