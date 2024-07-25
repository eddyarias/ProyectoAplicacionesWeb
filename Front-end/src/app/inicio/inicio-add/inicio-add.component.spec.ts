import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAddComponent } from './inicio-add.component';

describe('InicioAddComponent', () => {
  let component: InicioAddComponent;
  let fixture: ComponentFixture<InicioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
