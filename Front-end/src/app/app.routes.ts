import { Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { ReviewComponent } from './components/review/review.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { CrearJuegoComponent } from './components/crear-juego/crear-juego.component';
import { LeerJuegoComponent } from './components/leer-juegos/leer-juegos.component';
import { ActualizarJuegoComponent } from './components/actualizar-juego/actualizar-juego.component';
import { BorrarJuegoComponent } from './components/borrar-juego/borrar-juego.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {       path: 'juego/:id', component: AddProductComponent},
    {        path: 'login',        component: LoginComponent    },
    {        path: 'cart',        component: CartComponent    },
    {        path: 'home',        component: HomeComponent    },
    {        path: 'payment',        component: PaymentComponent    },
    {        path: 'register',        component: RegisterComponent    },
    {        path: 'review',        component: ReviewComponent    },
    {       path: 'navegacion', component: NavegacionComponent},
    {path: 'admin',
    component: AdminComponent},
      { path: 'crear', component: CrearJuegoComponent },
      { path: 'leer', component: LeerJuegoComponent },
      { path: 'actualizar', component: ActualizarJuegoComponent },
      { path: 'borrar', component: BorrarJuegoComponent }


];
