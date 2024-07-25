import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
//CONTENIDO
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule,
  ]
})
export class DashboardModule { }