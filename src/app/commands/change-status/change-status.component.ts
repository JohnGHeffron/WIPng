import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {

  @Input() sequence;

  constructor() { }

  ngOnChanges() {
    console.log(`received new sequence number ${this.sequence}`);
  }

  ngOnInit() {
  }

}
