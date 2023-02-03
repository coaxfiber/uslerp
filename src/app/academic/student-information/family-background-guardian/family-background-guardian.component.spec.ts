import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyBackgroundGuardianComponent } from './family-background-guardian.component';

describe('FamilyBackgroundGuardianComponent', () => {
  let component: FamilyBackgroundGuardianComponent;
  let fixture: ComponentFixture<FamilyBackgroundGuardianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyBackgroundGuardianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyBackgroundGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
