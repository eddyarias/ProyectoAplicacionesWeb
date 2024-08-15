// register.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues: IUser = this.registerForm.value;
      if (formValues.password === this.registerForm.get('confirmPassword')?.value) {
        this.userService.registerUser(formValues).subscribe(
          response => {
            console.log('Usuario registrado:', response);
            this.registerForm.reset();
          },
          error => {
            console.error('Error en el registro:', error);
          }
        );
      } else {
        console.error('Las contraseñas no coinciden');
      }
    }
  }
}
