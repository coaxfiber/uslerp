import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupCodeComponent } from './lookup-code.component';

describe('LookupCodeComponent', () => {
  let component: LookupCodeComponent;
  let fixture: ComponentFixture<LookupCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
