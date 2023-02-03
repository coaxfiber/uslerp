import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInfoCheckComponent } from './person-info-check.component';

describe('PersonInfoCheckComponent', () => {
  let component: PersonInfoCheckComponent;
  let fixture: ComponentFixture<PersonInfoCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonInfoCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInfoCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
