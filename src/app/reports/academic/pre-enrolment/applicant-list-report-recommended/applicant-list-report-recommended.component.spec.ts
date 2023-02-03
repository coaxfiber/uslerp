import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantListReportRecommendedComponent } from './applicant-list-report-recommended.component';

describe('ApplicantListReportRecommendedComponent', () => {
  let component: ApplicantListReportRecommendedComponent;
  let fixture: ComponentFixture<ApplicantListReportRecommendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantListReportRecommendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantListReportRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
