import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSummaryComponent } from './applicant-summary.component';

describe('ApplicantSummaryComponent', () => {
  let component: ApplicantSummaryComponent;
  let fixture: ComponentFixture<ApplicantSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
