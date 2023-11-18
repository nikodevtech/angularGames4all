import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlquilerComponent } from './detalle-alquiler.component';

describe('DetalleAlquilerComponent', () => {
  let component: DetalleAlquilerComponent;
  let fixture: ComponentFixture<DetalleAlquilerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAlquilerComponent]
    });
    fixture = TestBed.createComponent(DetalleAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
