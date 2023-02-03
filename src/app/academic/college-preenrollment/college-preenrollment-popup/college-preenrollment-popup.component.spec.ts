import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePreenrollmentPopupComponent } from './college-preenrollment-popup.component';

describe('CollegePreenrollmentPopupComponent', () => {
  let component: CollegePreenrollmentPopupComponent;
  let fixture: ComponentFixture<CollegePreenrollmentPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegePreenrollmentPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePreenrollmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
