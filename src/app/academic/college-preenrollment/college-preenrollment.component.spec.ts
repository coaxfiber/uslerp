import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePreenrollmentComponent } from './college-preenrollment.component';

describe('CollegePreenrollmentComponent', () => {
  let component: CollegePreenrollmentComponent;
  let fixture: ComponentFixture<CollegePreenrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegePreenrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePreenrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
