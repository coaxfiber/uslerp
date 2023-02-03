import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPorgComponent } from './add-porg.component';

describe('AddPorgComponent', () => {
  let component: AddPorgComponent;
  let fixture: ComponentFixture<AddPorgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPorgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
