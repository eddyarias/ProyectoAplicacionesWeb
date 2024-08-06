import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Importa el archivo de rutas
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EncabezadoComponent } from "./components/encabezado/encabezado.component";
import { PieComponent } from "./components/pie/pie.component";
import { CartComponent } from "./components/cart/cart.component";
import { HomeComponent } from './components/home/home.component';
import { ReviewComponent } from "./components/review/review.component";
import { PaymentComponent } from './components/payment/payment.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { JuegoService } from './services/juego.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EncabezadoComponent, 
    PieComponent, 
    CartComponent,
    AddProductComponent,
    HomeComponent,
    ReviewComponent,
    PaymentComponent, 
    NavegacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [JuegoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
