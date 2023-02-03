import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OGSComponent } from './ogs.component';

describe('OGSComponent', () => {
  let component: OGSComponent;
  let fixture: ComponentFixture<OGSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OGSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OGSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
