import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeComponent } from './update-we.component';

describe('UpdateWeComponent', () => {
  let component: UpdateWeComponent;
  let fixture: ComponentFixture<UpdateWeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
