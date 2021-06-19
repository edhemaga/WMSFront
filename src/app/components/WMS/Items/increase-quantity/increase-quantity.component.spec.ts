import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseQuantityComponent } from './increase-quantity.component';

describe('IncreaseQuantityComponent', () => {
  let component: IncreaseQuantityComponent;
  let fixture: ComponentFixture<IncreaseQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreaseQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
