import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsManagerComponent } from './sets-manager.component';

describe('SetsManagerComponent', () => {
  let component: SetsManagerComponent;
  let fixture: ComponentFixture<SetsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
