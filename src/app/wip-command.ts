export class WipCommand {
  caption: string;
  // get caption(): string {
  //   return this._caption;
  // }
  // set caption(value: string) {
  //   this._caption = value;
  // }
  enabled: boolean;
  expires: boolean;
  url: string;
  
  constructor(caption: string, enabled: boolean, expires: boolean, url: string){
    this.caption = caption;
    this.enabled = enabled;
    this.expires = expires;
    this.url = url;
  }

  get route(): string {
    return this.caption.replace(" ","-").toLowerCase();
  }
}
