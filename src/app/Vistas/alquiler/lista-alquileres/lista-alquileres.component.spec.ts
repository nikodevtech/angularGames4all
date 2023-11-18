import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlquileresComponent } from './lista-alquileres.component';

describe('ListaAlquileresComponent', () => {
  let component: ListaAlquileresComponent;
  let fixture: ComponentFixture<ListaAlquileresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAlquileresComponent]
    });
    fixture = TestBed.createComponent(ListaAlquileresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
