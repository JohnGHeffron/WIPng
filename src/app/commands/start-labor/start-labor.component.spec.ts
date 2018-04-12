import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLaborComponent } from './start-labor.component';

describe('StartLaborComponent', () => {
  let component: StartLaborComponent;
  let fixture: ComponentFixture<StartLaborComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartLaborComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
