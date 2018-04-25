import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WipCommand } from '../../wip-command';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-command-modal',
  templateUrl: './command-modal.component.html',
  styleUrls: ['./command-modal.component.css']
})
export class CommandModalComponent implements OnInit {

  @Input() command: WipCommand;

  title: string;
  sequence: number = 0;

  constructor(private modalService: NgbModal, private router: Router) { }

  open(content) {
    if (this.command.routes.length > 0){
      this.modalService.open(content);
      this.router.navigate([this.command.routes[0]]);
    } else {
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
