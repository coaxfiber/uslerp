import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationManagerComponent } from './application-manager.component';

describe('ApplicationManagerComponent', () => {
  let component: ApplicationManagerComponent;
  let fixture: ComponentFixture<ApplicationManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
