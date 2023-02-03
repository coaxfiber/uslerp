import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSetOptionsComponent } from './select-set-options.component';

describe('SelectSetOptionsComponent', () => {
  let component: SelectSetOptionsComponent;
  let fixture: ComponentFixture<SelectSetOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSetOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
