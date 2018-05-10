import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-record-quantity',
  templateUrl: './record-quantity.component.html',
  styleUrls: ['./record-quantity.component.css']
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
