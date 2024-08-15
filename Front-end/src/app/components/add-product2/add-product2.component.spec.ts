import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent2 } from './add-product2.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent2;
  let fixture: ComponentFixture<AddProductComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductComponent2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
