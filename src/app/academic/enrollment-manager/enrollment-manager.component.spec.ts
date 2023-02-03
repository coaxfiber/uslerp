import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentManagerComponent } from './enrollment-manager.component';

describe('EnrollmentManagerComponent', () => {
  let component: EnrollmentManagerComponent;
  let fixture: ComponentFixture<EnrollmentManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
