import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Corregido "styleUrl" a "styleUrls"
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private router: Router) {} // Inyecta el Router


  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  updateQuantity(item: any, quantity: number): void {
    item.cantidad += quantity;
    if (item.cantidad <= 0) {
      this.removeItem(item);
    } else {
      this.saveCart();
      this.calculateTotal();
    }
  }

  removeItem(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem._id !== item._id);
    this.saveCart();
    this.calculateTotal();
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
    this.total = 0;
  }

  continueShopping(): void {
    this.router.navigate(['/home']); // Redirige a la página principal o a la página de productos
  }
}
