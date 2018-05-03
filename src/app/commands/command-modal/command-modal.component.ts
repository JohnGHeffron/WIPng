import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WipCommand } from '../../wip-command';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppStateService } from '../../app-state.service';

@Component({
  selector: 'app-command-modal',
  templateUrl: './command-modal.component.html',
  styleUrls: ['./command-modal.component.css']
})
export class CommandModalComponent implements OnInit {

  @Input() command: WipCommand;

  title: string;
  sequence: number = 0;

  constructor(private modalService: NgbModal, 
      private router: Router, private appState: AppStateService) { }

  doCommand(content) {
    if (this.command.routes.length > 0){
      this.modalService
        .open(content).result
        .then( result => { 
          this.command.run(); 
          if (this.command.expires) {
            this.appState.operator = null;
          }
        }, 
               reason => { 
          console.log(reason); 
          return reason != 'Cross click'}); // Is there some way to cancel a dismiss??
      this.router.navigate([this.command.routes[0]]);
    } 
    else {
      this.command.run();
    }
  }

  next() {
    this.sequence = ++this.sequence % this.command.routes.length;
    this.router.navigate([this.command.routes[this.sequence]]);
  }

  onTitleChanged(title:string) {
    console.log("in parent component (modal)");
    this.title = title;
  }

  ngOnInit() {
    this.title = this.command.caption;
    this.sequence = 0;
  }

}
