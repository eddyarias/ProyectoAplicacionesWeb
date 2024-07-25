import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';

import {InicioInicioComponent} from './inicio-inicio/inicio-inicio.component';
import {InicioFiltrarComponent} from './inicio-filtrar/inicio-filtrar.component';
import {InicioCarritoComponent} from './inicio-carrito/inicio-carrito.component';
import {InicioAddComponent} from './inicio-add/inicio-add.component';
import {InicioPagoComponent} from './inicio-pago/inicio-pago.component';




@NgModule({
  declarations: [
    InicioInicioComponent,
    InicioFiltrarComponent,
    InicioCarritoComponent,
    InicioAddComponent,
    InicioPagoComponent
    
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
