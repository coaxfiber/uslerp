import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportModalitiesComponent } from './report-modalities.component';

describe('ReportModalitiesComponent', () => {
  let component: ReportModalitiesComponent;
  let fixture: ComponentFixture<ReportModalitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportModalitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportModalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
