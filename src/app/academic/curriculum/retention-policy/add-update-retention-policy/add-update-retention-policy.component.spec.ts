import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRetentionPolicyComponent } from './add-update-retention-policy.component';

describe('AddUpdateRetentionPolicyComponent', () => {
  let component: AddUpdateRetentionPolicyComponent;
  let fixture: ComponentFixture<AddUpdateRetentionPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateRetentionPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateRetentionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
