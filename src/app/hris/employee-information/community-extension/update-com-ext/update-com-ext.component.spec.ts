import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComExtComponent } from './update-com-ext.component';

describe('UpdateComExtComponent', () => {
  let component: UpdateComExtComponent;
  let fixture: ComponentFixture<UpdateComExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateComExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
