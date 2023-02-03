import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankRecordsComponent } from './rank-records.component';

describe('RankRecordsComponent', () => {
  let component: RankRecordsComponent;
  let fixture: ComponentFixture<RankRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
