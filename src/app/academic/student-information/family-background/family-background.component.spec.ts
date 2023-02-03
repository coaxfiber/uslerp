import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyBackgroundComponent } from './family-background.component';

describe('FamilyBackgroundComponent', () => {
  let component: FamilyBackgroundComponent;
  let fixture: ComponentFixture<FamilyBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
