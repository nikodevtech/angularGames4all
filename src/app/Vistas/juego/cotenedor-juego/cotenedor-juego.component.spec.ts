import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotenedorJuegoComponent } from './cotenedor-juego.component';

describe('CotenedorJuegoComponent', () => {
  let component: CotenedorJuegoComponent;
  let fixture: ComponentFixture<CotenedorJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotenedorJuegoComponent]
    });
    fixture = TestBed.createComponent(CotenedorJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
