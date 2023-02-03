import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingApplicantTextBlastComponent } from './loading-applicant-text-blast.component';

describe('LoadingApplicantTextBlastComponent', () => {
  let component: LoadingApplicantTextBlastComponent;
  let fixture: ComponentFixture<LoadingApplicantTextBlastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingApplicantTextBlastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingApplicantTextBlastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
