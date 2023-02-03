import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSubjectsComponent } from './add-update-subjects.component';

describe('AddUpdateSubjectsComponent', () => {
  let component: AddUpdateSubjectsComponent;
  let fixture: ComponentFixture<AddUpdateSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
