import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeCodeComponent } from './alternative-code.component';

describe('AlternativeCodeComponent', () => {
  let component: AlternativeCodeComponent;
  let fixture: ComponentFixture<AlternativeCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
