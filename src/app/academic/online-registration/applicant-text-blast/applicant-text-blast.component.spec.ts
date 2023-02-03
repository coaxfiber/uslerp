import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantTextBlastComponent } from './applicant-text-blast.component';

describe('ApplicantTextBlastComponent', () => {
  let component: ApplicantTextBlastComponent;
  let fixture: ComponentFixture<ApplicantTextBlastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantTextBlastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantTextBlastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
