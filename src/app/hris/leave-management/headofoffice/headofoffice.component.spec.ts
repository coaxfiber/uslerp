import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadofofficeComponent } from './headofoffice.component';

describe('HeadofofficeComponent', () => {
  let component: HeadofofficeComponent;
  let fixture: ComponentFixture<HeadofofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadofofficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadofofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
