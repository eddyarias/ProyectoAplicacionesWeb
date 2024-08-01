import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFiltrarComponent } from './inicio-filtrar.component';

describe('InicioFiltrarComponent', () => {
  let component: InicioFiltrarComponent;
  let fixture: ComponentFixture<InicioFiltrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioFiltrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioFiltrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
