import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeProjectionComponent } from './code-projection.component';

describe('CodeProjectionComponent', () => {
  let component: CodeProjectionComponent;
  let fixture: ComponentFixture<CodeProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
