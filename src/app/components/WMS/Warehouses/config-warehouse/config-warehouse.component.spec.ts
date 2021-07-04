import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigWarehouseComponent } from './config-warehouse.component';

describe('ConfigWarehouseComponent', () => {
  let component: ConfigWarehouseComponent;
  let fixture: ComponentFixture<ConfigWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
