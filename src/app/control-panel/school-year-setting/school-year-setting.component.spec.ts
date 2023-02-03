import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearSettingComponent } from './school-year-setting.component';

describe('SchoolYearSettingComponent', () => {
  let component: SchoolYearSettingComponent;
  let fixture: ComponentFixture<SchoolYearSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
