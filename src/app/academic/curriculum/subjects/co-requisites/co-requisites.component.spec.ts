import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoRequisitesComponent } from './co-requisites.component';

describe('CoRequisitesComponent', () => {
  let component: CoRequisitesComponent;
  let fixture: ComponentFixture<CoRequisitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoRequisitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoRequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
