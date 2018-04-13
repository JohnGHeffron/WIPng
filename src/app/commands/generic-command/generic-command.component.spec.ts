import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCommandComponent } from './generic-command.component';

describe('GenericCommandComponent', () => {
  let component: GenericCommandComponent;
  let fixture: ComponentFixture<GenericCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
