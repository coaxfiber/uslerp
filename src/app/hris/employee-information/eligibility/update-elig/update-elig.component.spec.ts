import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEligComponent } from './update-elig.component';

describe('UpdateEligComponent', () => {
  let component: UpdateEligComponent;
  let fixture: ComponentFixture<UpdateEligComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEligComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEligComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
