import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumSubjectTypeAddComponent } from './curriculum-subject-type-add.component';

describe('CurriculumSubjectTypeAddComponent', () => {
  let component: CurriculumSubjectTypeAddComponent;
  let fixture: ComponentFixture<CurriculumSubjectTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumSubjectTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumSubjectTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
