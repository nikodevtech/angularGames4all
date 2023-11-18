import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorUsuarioComponent } from './contenedor-usuario.component';

describe('ContenedorUsuarioComponent', () => {
  let component: ContenedorUsuarioComponent;
  let fixture: ComponentFixture<ContenedorUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenedorUsuarioComponent]
    });
    fixture = TestBed.createComponent(ContenedorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
