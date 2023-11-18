import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorAlquilerComponent } from './contenedor-alquiler.component';

describe('ContenedorAlquilerComponent', () => {
  let component: ContenedorAlquilerComponent;
  let fixture: ComponentFixture<ContenedorAlquilerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenedorAlquilerComponent]
    });
    fixture = TestBed.createComponent(ContenedorAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
