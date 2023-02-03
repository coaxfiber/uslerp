import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonLookupComponent } from './person-lookup.component';

describe('PersonLookupComponent', () => {
  let component: PersonLookupComponent;
  let fixture: ComponentFixture<PersonLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
