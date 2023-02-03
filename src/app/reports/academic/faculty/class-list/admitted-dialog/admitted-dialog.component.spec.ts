import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmittedDialogComponent } from './admitted-dialog.component';

describe('AdmittedDialogComponent', () => {
  let component: AdmittedDialogComponent;
  let fixture: ComponentFixture<AdmittedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmittedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmittedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
