import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioCarritoComponent } from './inicio-carrito.component';

describe('InicioCarritoComponent', () => {
  let component: InicioCarritoComponent;
  let fixture: ComponentFixture<InicioCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
