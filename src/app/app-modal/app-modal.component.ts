import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-app-modal-content',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css']
})

export class AppModalContent {
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-app-modal',
  template: ''
})
//-------------------------------------------------------------------------
export class AppModalComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    const modalRef = this.modalService.open(AppModalContent);
    modalRef.result
    .then( result => {this.router.navigate([""])},
          reason => {this.router.navigate([""])});
  }
}