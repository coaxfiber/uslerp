import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPreRequisitesComponent } from './other-pre-requisites.component';

describe('OtherPreRequisitesComponent', () => {
  let component: OtherPreRequisitesComponent;
  let fixture: ComponentFixture<OtherPreRequisitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPreRequisitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPreRequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
