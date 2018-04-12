import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NullCommandComponent } from './null-command.component';

describe('NullCommandComponent', () => {
  let component: NullCommandComponent;
  let fixture: ComponentFixture<NullCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NullCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NullCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
