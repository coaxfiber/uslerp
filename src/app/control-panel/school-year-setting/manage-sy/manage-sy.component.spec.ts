import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSyComponent } from './manage-sy.component';

describe('ManageSyComponent', () => {
  let component: ManageSyComponent;
  let fixture: ComponentFixture<ManageSyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
