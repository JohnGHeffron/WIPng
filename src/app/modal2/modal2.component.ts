import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.css']
})
export class Modal2Component implements OnInit {

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
  }

}
