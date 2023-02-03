import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingEngagementComponent } from './speaking-engagement.component';

describe('SpeakingEngagementComponent', () => {
  let component: SpeakingEngagementComponent;
  let fixture: ComponentFixture<SpeakingEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakingEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakingEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
