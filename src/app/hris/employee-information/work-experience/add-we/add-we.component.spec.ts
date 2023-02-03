import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeComponent } from './add-we.component';

describe('AddWeComponent', () => {
  let component: AddWeComponent;
  let fixture: ComponentFixture<AddWeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
