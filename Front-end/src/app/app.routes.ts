import { Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: 'juego/:id', component: AddProductComponent},
    {path: '**', component: HomeComponent}
    
];
