import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {

  @Input() sequence;
  jobstatuses: string [] = ['held', 'started', 'active', 'completed'];
  selected: string = 'started';

  constructor() { }

  ngOnChanges() {
    console.log(`received new sequence number ${this.sequence}`);
  }

  ngOnInit() {
  }

}
