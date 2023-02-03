import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceExamScheduleManagerComponent } from './entrance-exam-schedule-manager.component';

describe('EntranceExamScheduleManagerComponent', () => {
  let component: EntranceExamScheduleManagerComponent;
  let fixture: ComponentFixture<EntranceExamScheduleManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceExamScheduleManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceExamScheduleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
