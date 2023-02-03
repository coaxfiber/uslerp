import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementStudentComponent } from './user-management-student.component';

describe('UserManagementStudentComponent', () => {
  let component: UserManagementStudentComponent;
  let fixture: ComponentFixture<UserManagementStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
