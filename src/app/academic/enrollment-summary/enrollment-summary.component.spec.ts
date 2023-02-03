import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentSummaryComponent } from './enrollment-summary.component';

describe('EnrollmentSummaryComponent', () => {
  let component: EnrollmentSummaryComponent;
  let fixture: ComponentFixture<EnrollmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
