import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollmentSummaryComponent } from './student-enrollment-summary.component';

describe('StudentEnrollmentSummaryComponent', () => {
  let component: StudentEnrollmentSummaryComponent;
  let fixture: ComponentFixture<StudentEnrollmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEnrollmentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
