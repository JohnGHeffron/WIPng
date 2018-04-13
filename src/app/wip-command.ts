export class WipCommand {
  caption: string;
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
