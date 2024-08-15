import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarJuegoComponent } from './borrar-juego.component';

describe('BorrarJuegoComponent', () => {
  let component: BorrarJuegoComponent;
  let fixture: ComponentFixture<BorrarJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
