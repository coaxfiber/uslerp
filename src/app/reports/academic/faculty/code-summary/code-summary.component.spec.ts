import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSummaryComponent } from './code-summary.component';

describe('CodeSummaryComponent', () => {
  let component: CodeSummaryComponent;
  let fixture: ComponentFixture<CodeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
