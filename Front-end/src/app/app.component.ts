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


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
            RouterOutlet,
            LoginComponent,
            RegisterComponent,
            EncabezadoComponent, 
            PieComponent, 
            CartComponent,
            HomeComponent,
            ReviewComponent,
            PaymentComponent, NavegacionComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'Front-end';
}
