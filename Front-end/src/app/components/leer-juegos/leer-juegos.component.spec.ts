import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerJuegosComponent } from './leer-juegos.component';

describe('LeerJuegosComponent', () => {
  let component: LeerJuegosComponent;
  let fixture: ComponentFixture<LeerJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeerJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeerJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
