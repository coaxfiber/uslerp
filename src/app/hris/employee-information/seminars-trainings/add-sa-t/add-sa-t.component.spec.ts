import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaTComponent } from './add-sa-t.component';

describe('AddSaTComponent', () => {
  let component: AddSaTComponent;
  let fixture: ComponentFixture<AddSaTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSaTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSaTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
