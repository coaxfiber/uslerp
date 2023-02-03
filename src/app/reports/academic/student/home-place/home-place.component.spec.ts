import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlaceComponent } from './home-place.component';

describe('HomePlaceComponent', () => {
  let component: HomePlaceComponent;
  let fixture: ComponentFixture<HomePlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
