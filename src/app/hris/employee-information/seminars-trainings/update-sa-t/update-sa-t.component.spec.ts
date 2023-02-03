import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSaTComponent } from './update-sa-t.component';

describe('UpdateSaTComponent', () => {
  let component: UpdateSaTComponent;
  let fixture: ComponentFixture<UpdateSaTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSaTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSaTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
