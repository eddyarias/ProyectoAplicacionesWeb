import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioInicioComponent } from './inicio-inicio.component';

describe('InicioInicioComponent', () => {
  let component: InicioInicioComponent;
  let fixture: ComponentFixture<InicioInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
