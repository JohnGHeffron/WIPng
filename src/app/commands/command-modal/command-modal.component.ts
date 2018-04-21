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
    if (this.command.hasUI) {
    }
    this.modalService.open(content);
    if (this.command.subcommands.length > 0){
      this.router.navigate([this.command.subcommands[0]]);
    } else {
      this.router.navigate([this.command.name]);
    }
  }

  next() {
    this.sequence = ++this.sequence % this.command.subcommands.length;
    console.log("sequence: ", this.sequence);
    this.router.navigate([this.command.subcommands[this.sequence]]);
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
