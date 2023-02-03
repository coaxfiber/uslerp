import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateCompanyComponent } from './addupdate-company.component';

describe('AddupdateCompanyComponent', () => {
  let component: AddupdateCompanyComponent;
  let fixture: ComponentFixture<AddupdateCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddupdateCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddupdateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
