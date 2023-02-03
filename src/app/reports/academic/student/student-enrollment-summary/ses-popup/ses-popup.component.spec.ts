import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesPopupComponent } from './ses-popup.component';

describe('SesPopupComponent', () => {
  let component: SesPopupComponent;
  let fixture: ComponentFixture<SesPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
