import { Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { ReviewComponent } from './components/review/review.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';

export const routes: Routes = [
    {       path: 'juego/:id', component: AddProductComponent},
    {        path: 'login',        component: LoginComponent    },
    {        path: 'cart',        component: CartComponent    },
    {        path: 'home',        component: HomeComponent    },
    {        path: 'payment',        component: PaymentComponent    },
    {        path: 'register',        component: RegisterComponent    },
    {        path: 'review',        component: ReviewComponent    },
    {       path: 'navegacion', component: NavegacionComponent},
    {       path: '**', component: HomeComponent}
    
];
