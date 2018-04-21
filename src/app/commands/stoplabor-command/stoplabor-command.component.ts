import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stoplabor-command',
  templateUrl: './stoplabor-command.component.html'
})

export class StopLaborCommandComponent implements OnInit, OnChanges {

  @Input() sequence: number;
  components: any[] = ['record-pieces', 'change-status', 'prod-receipt'];

  constructor(private router: Router) {}

  ngOnChanges() {
    console.log(`received new sequence number ${this.sequence}`);
  }

  ngOnInit() {
    this.router.navigate([{outlets: {workflow: this.components[0]}}]);
  }

}