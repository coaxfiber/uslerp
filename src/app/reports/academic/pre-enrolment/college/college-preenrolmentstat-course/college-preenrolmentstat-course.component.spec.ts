import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePreenrolmentstatCourseComponent } from './college-preenrolmentstat-course.component';

describe('CollegePreenrolmentstatCourseComponent', () => {
  let component: CollegePreenrolmentstatCourseComponent;
  let fixture: ComponentFixture<CollegePreenrolmentstatCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegePreenrolmentstatCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePreenrolmentstatCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
