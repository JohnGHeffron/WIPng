import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-generic-command',
  templateUrl: './generic-command.component.html',
  styleUrls: ['./generic-command.component.css']
})
export class GenericCommandComponent implements OnInit {

  @Input() caption: string;
  @Input() commandName: string; 
  @Input() disabled: boolean = true;

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
  }

}
