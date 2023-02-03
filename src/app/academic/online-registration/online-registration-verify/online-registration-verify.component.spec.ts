import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRegistrationVerifyComponent } from './online-registration-verify.component';

describe('OnlineRegistrationVerifyComponent', () => {
  let component: OnlineRegistrationVerifyComponent;
  let fixture: ComponentFixture<OnlineRegistrationVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineRegistrationVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineRegistrationVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
