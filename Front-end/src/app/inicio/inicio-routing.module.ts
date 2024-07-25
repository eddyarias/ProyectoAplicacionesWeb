import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//import { routes } from '../app.routes';
import {InicioInicioComponent} from './inicio-inicio/inicio-inicio.component';
import {InicioFiltrarComponent} from './inicio-filtrar/inicio-filtrar.component';
import {InicioCarritoComponent} from './inicio-carrito/inicio-carrito.component';
import {InicioAddComponent} from './inicio-add/inicio-add.component';
import {InicioPagoComponent} from './inicio-pago/inicio-pago.component';


const routes: Routes=[
   {path:'inicio', component: InicioInicioComponent},
   {path:'filtrar', component: InicioFiltrarComponent},
   {path:'carrito', component: InicioCarritoComponent},
   {path:'agregar', component: InicioAddComponent},
   {path:'pago', component: InicioPagoComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class InicioRoutingModule { }
