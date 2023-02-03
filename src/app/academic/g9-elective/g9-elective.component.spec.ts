import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { G9ElectiveComponent } from './g9-elective.component';

describe('G9ElectiveComponent', () => {
  let component: G9ElectiveComponent;
  let fixture: ComponentFixture<G9ElectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ G9ElectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(G9ElectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
