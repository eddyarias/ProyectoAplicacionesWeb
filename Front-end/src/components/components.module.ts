import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PieComponent } from './pie/pie.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './review/review.component';
import { PaymentComponent } from './payment/payment.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { ComponentsRoutingModule } from './components-routing.module';

import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EncabezadoComponent,
    PieComponent,
    CartComponent,
    HomeComponent,
    ReviewComponent,
    PaymentComponent,
    NavegacionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsRoutingModule,
    MatInputModule,
    MatToolbarModule,
  ],
  providers: []
})
export class ComponentesModule { }
