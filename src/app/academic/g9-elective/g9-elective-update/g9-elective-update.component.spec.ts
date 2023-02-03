import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { G9ElectiveUpdateComponent } from './g9-elective-update.component';

describe('G9ElectiveUpdateComponent', () => {
  let component: G9ElectiveUpdateComponent;
  let fixture: ComponentFixture<G9ElectiveUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ G9ElectiveUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(G9ElectiveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
