import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreaseQuantityComponent } from './decrease-quantity.component';

describe('DecreaseQuantityComponent', () => {
  let component: DecreaseQuantityComponent;
  let fixture: ComponentFixture<DecreaseQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecreaseQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecreaseQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
