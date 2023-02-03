import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComExtComponent } from './add-com-ext.component';

describe('AddComExtComponent', () => {
  let component: AddComExtComponent;
  let fixture: ComponentFixture<AddComExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
