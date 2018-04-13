import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notimplemented',
  template: '<p>Command is not yet implemented.</p>',
  styles: []
})
export class NotImplementedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
