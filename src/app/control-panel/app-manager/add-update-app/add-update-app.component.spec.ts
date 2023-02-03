import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAppComponent } from './add-update-app.component';

describe('AddUpdateAppComponent', () => {
  let component: AddUpdateAppComponent;
  let fixture: ComponentFixture<AddUpdateAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
