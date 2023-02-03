import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementReportcardComponent } from './placement-reportcard.component';

describe('PlacementReportcardComponent', () => {
  let component: PlacementReportcardComponent;
  let fixture: ComponentFixture<PlacementReportcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementReportcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementReportcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
