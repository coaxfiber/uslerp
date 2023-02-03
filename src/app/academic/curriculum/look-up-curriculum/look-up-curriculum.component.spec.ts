import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookUpCurriculumComponent } from './look-up-curriculum.component';

describe('LookUpCurriculumComponent', () => {
  let component: LookUpCurriculumComponent;
  let fixture: ComponentFixture<LookUpCurriculumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookUpCurriculumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookUpCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
