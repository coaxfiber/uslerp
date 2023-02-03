import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumSubjectTypeComponent } from './curriculum-subject-type.component';

describe('CurriculumSubjectTypeComponent', () => {
  let component: CurriculumSubjectTypeComponent;
  let fixture: ComponentFixture<CurriculumSubjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumSubjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumSubjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
