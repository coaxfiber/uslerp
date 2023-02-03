import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollmentStatisticComponent } from './student-enrollment-statistic.component';

describe('StudentEnrollmentStatisticComponent', () => {
  let component: StudentEnrollmentStatisticComponent;
  let fixture: ComponentFixture<StudentEnrollmentStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEnrollmentStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollmentStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
