import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from "./components/encabezado/encabezado.component";
import { PieComponent } from "./components/pie/pie.component";
import { CartComponent } from "./components/cart/cart.component";
import { HomeComponent } from './components/home/home.component';
import { ReviewComponent } from "./components/review/review.component";
import { PaymentComponent } from './components/payment/payment.component';
import { NavegacionComponent  } from './components/navegacion/navegacion.component';


import { FormsModule } from '@angular/forms'; // Importar FormsModule si no está ya importado
import { AddProductComponent } from './components/add-product/add-product.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
            RouterOutlet,
            LoginComponent,
            RegisterComponent,
            EncabezadoComponent, 
            PieComponent, 
            CartComponent, AddProductComponent,
            HomeComponent,
            ReviewComponent,
            PaymentComponent, 
            NavegacionComponent,
            FormsModule,
            HttpClientModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'Front-end';
  products = [
    { name: 'Producto 1', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 2', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 3', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 4', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 5', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 6', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 7', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 8', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 9', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 10', image: 'https://via.placeholder.com/150' }
  ];
}
