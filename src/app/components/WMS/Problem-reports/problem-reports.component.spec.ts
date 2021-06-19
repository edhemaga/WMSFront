import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemReportsComponent } from './problem-reports.component';

describe('ProblemReportsComponent', () => {
  let component: ProblemReportsComponent;
  let fixture: ComponentFixture<ProblemReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
