import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResearchComponent } from './update-research.component';

describe('UpdateResearchComponent', () => {
  let component: UpdateResearchComponent;
  let fixture: ComponentFixture<UpdateResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
