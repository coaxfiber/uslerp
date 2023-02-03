import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePorgComponent } from './update-porg.component';

describe('UpdatePorgComponent', () => {
  let component: UpdatePorgComponent;
  let fixture: ComponentFixture<UpdatePorgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePorgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
