import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolmentSummaryComponent } from './enrolment-summary.component';

describe('EnrolmentSummaryComponent', () => {
  let component: EnrolmentSummaryComponent;
  let fixture: ComponentFixture<EnrolmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolmentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
