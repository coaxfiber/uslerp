import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsClassScheduleComponent } from './hs-class-schedule.component';

describe('HsClassScheduleComponent', () => {
  let component: HsClassScheduleComponent;
  let fixture: ComponentFixture<HsClassScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsClassScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsClassScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
