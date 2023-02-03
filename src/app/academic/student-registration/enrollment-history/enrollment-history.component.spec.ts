import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentHistoryComponent } from './enrollment-history.component';

describe('EnrollmentHistoryComponent', () => {
  let component: EnrollmentHistoryComponent;
  let fixture: ComponentFixture<EnrollmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
