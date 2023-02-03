import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetsComponent } from './add-sets.component';

describe('AddSetsComponent', () => {
  let component: AddSetsComponent;
  let fixture: ComponentFixture<AddSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
