import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalbackgroundAddComponent } from './educationalbackground-add.component';

describe('EducationalbackgroundAddComponent', () => {
  let component: EducationalbackgroundAddComponent;
  let fixture: ComponentFixture<EducationalbackgroundAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalbackgroundAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalbackgroundAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
