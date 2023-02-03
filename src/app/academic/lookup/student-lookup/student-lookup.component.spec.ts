import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLookupComponent } from './student-lookup.component';

describe('StudentLookupComponent', () => {
  let component: StudentLookupComponent;
  let fixture: ComponentFixture<StudentLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
