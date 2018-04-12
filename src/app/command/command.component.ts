import { Component, OnInit, Input } from '@angular/core';
//import { Router } from '@angular/router';
import { WipCommand } from '../wip-command';

@Component({
  selector: 'app-command',
  template: `<input type="button" [disabled]="!command.enabled" 
                                  value="{{command.caption}}"
                                  routerLink="{{command.route}}">`,
                                  // (click)="invokeCommand()" >`,
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {

  constructor() { } //private router: Router

  @Input() command: WipCommand;

  // invokeCommand() {
  //   this.router.navigate([this.command.route]);
  // }

  ngOnInit() {
  }

}
