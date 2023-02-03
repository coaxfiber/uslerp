import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAssignApplicantComponent } from './person-assign-applicant.component';

describe('PersonAssignApplicantComponent', () => {
  let component: PersonAssignApplicantComponent;
  let fixture: ComponentFixture<PersonAssignApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAssignApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAssignApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
