import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePreenrolmentstatDepartmentComponent } from './college-preenrolmentstat-department.component';

describe('CollegePreenrolmentstatDepartmentComponent', () => {
  let component: CollegePreenrolmentstatDepartmentComponent;
  let fixture: ComponentFixture<CollegePreenrolmentstatDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegePreenrolmentstatDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePreenrolmentstatDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
