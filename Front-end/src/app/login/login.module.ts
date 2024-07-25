import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    LoginComponent,
    CreateComponent,
    
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
