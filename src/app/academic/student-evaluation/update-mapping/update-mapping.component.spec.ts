import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMappingComponent } from './update-mapping.component';

describe('UpdateMappingComponent', () => {
  let component: UpdateMappingComponent;
  let fixture: ComponentFixture<UpdateMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
