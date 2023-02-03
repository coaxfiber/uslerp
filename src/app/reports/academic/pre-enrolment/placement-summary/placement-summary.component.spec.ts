import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementSummaryComponent } from './placement-summary.component';

describe('PlacementSummaryComponent', () => {
  let component: PlacementSummaryComponent;
  let fixture: ComponentFixture<PlacementSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
