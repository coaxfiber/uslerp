import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalbackgroundUpdateComponent } from './educationalbackground-update.component';

describe('EducationalbackgroundUpdateComponent', () => {
  let component: EducationalbackgroundUpdateComponent;
  let fixture: ComponentFixture<EducationalbackgroundUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalbackgroundUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalbackgroundUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
