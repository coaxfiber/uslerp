import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurgingComponent } from './purging.component';

describe('PurgingComponent', () => {
  let component: PurgingComponent;
  let fixture: ComponentFixture<PurgingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurgingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
