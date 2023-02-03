import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSetsComponent } from './assign-sets.component';

describe('AssignSetsComponent', () => {
  let component: AssignSetsComponent;
  let fixture: ComponentFixture<AssignSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
