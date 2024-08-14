import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';  // Importa el componente standalone

@NgModule({
  declarations: [
    LoginComponent,
    // No declarar CreateComponent aquí
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CreateComponent  // Importa CreateComponent como standalone
  ]
})
export class LoginModule { }
