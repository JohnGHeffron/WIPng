import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-production-receipt',
  templateUrl: './production-receipt.component.html',
  styleUrls: ['./production-receipt.component.css']
})
export class ProductionReceiptComponent implements OnInit {

  @Output() titleChanged: EventEmitter<any> = new EventEmitter();

  title: string = "Production Receipt";

  constructor() { }

  ngOnInit() {
    console.log("in production receipt component");
    this.titleChanged.emit(this.title);
  }

}
