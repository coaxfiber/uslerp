import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRegistrationUpdateComponent } from './online-registration-update.component';

describe('OnlineRegistrationUpdateComponent', () => {
  let component: OnlineRegistrationUpdateComponent;
  let fixture: ComponentFixture<OnlineRegistrationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineRegistrationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineRegistrationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
