import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiService } from '../../api.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-record-quantity',
  templateUrl: './record-quantity.component.html',
  styleUrls: ['./record-quantity.component.css'],
  animations: [
    trigger('showHide', [
      transition('void => *', [
        style({opacity:0, transform: 'translateY(-100%)'}),
        animate('0.3s ease-in')
      ]),
      transition('* => void', [
        animate('0.3s ease-out', style({opacity:0, transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class RecordQuantityComponent implements OnInit {

  reasons: any[];
  SCRAP_REASONS_ID: number = 9;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getReasonCodes(this.SCRAP_REASONS_ID)
    .then (response => {return response.json();})
    .then ( data => { this.reasons = data;});
  }

}
