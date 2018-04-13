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

  constructor(private modalService: NgbModal, private router: Router) { }

  open(content) {
    this.modalService.open(content);
    this.router.navigate([this.command.route]);
  }

  ngOnInit() {
  }

}
