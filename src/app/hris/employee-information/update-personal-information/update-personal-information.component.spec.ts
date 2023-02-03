import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonalInformationComponent } from './update-personal-information.component';

describe('UpdatePersonalInformationComponent', () => {
  let component: UpdatePersonalInformationComponent;
  let fixture: ComponentFixture<UpdatePersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
