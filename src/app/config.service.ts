import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService {
  
  SCHEME: string = "http";
  HOST: string = "localhost";
  APP: string  = "mes"; 

  // SCHEME: string = "https";
  // HOST: string = "dev-mes-52";
  // APP: string  = "paperless.web.api";
}