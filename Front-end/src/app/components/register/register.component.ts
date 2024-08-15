import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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
    // Marca todos los campos como "touched" para activar las validaciones
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      let errorMessage = '';

      if (this.registerForm.get('email')?.invalid) {
        errorMessage += 'Correo electrónico no válido o vacío. ';
      }
      if (this.registerForm.get('nombre')?.invalid) {
        errorMessage += 'Nombre de usuario vacío. ';
      }
      if (this.registerForm.get('password')?.invalid) {
        errorMessage += 'La contraseña debe tener al menos 6 caracteres. ';
      }
      if (this.registerForm.get('confirmPassword')?.invalid) {
        errorMessage += 'Debe confirmar su contraseña. ';
      }

      Swal.fire({
        icon: 'error',
        title: 'Faltan campos',
        text: errorMessage.trim(),
        confirmButtonText: 'Intentar de nuevo'
      });
      return;
    }

    const formValues: IUser = this.registerForm.value;

    if (formValues.password !== this.registerForm.get('confirmPassword')?.value) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas ingresadas no coinciden.',
        confirmButtonText: 'Intentar de nuevo'
      });
      return;
    }

    Swal.fire({
      title: '¿Está seguro de que desea registrar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.registerUser(formValues).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: 'Usuario registrado exitosamente.',
              confirmButtonText: 'Continuar'
            });
            this.registerForm.reset();
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error en el registro',
              text: error.error.message || 'Hubo un error al registrar el usuario.',
              confirmButtonText: 'Intentar de nuevo'
            });
          }
        );
      }
    });
  }
}
