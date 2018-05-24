import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-job-list-item',
  template: `<div class="info-button clearfix {{job.selected}}" (click)="onClick()">
      <div class="info-button--text">
        <div class="info-button--caption">{{job.order}}</div>
        <div class="info-button--detail">{{buttonDetail(job)}}</div>
      </div>
      <img class="info-button--image" src="{{job.i}}" />
      <img class="info-button--image" src="{{job.s}}" />
    </div>`,
  styleUrls: ['./job-list-item.component.css']
})

export class JobListItemComponent {
  @Input() job: any;
  @Output() jobSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onClick() {
    this.jobSelected.emit(this.job);
  }

  buttonDetail(job: any): string {
    return job.user ? `${job.item} | ${job.user}` : `${job.item}`;
  }

}
