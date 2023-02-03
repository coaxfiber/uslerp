import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeLastSyComponent } from './grade-last-sy.component';

describe('GradeLastSyComponent', () => {
  let component: GradeLastSyComponent;
  let fixture: ComponentFixture<GradeLastSyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeLastSyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeLastSyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
