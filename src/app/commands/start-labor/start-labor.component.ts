import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-start-labor',
  templateUrl: './start-labor.component.html',
  styleUrls: ['./start-labor.component.css']
})
export class StartLaborComponent implements OnInit {

  constructor(private router: Router) { 
    console.log("In ctor for start-labor.")
  }

  ngOnInit() {
    // do some stuff
    console.log("Invoke start-labor.");
    //this.modalService.open(content).
    //this.router.navigate([""]);
  }

}
