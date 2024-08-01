import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPagoComponent } from './inicio-pago.component';

describe('InicioPagoComponent', () => {
  let component: InicioPagoComponent;
  let fixture: ComponentFixture<InicioPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
