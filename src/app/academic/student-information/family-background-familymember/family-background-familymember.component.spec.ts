import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyBackgroundFamilymemberComponent } from './family-background-familymember.component';

describe('FamilyBackgroundFamilymemberComponent', () => {
  let component: FamilyBackgroundFamilymemberComponent;
  let fixture: ComponentFixture<FamilyBackgroundFamilymemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyBackgroundFamilymemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyBackgroundFamilymemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
