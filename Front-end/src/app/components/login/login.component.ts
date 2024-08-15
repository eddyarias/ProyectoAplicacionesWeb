// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RouterModule, Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router // Inyecta el Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe(
        response => {
          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('user', JSON.stringify(response.user)); // Guardar datos del usuario en localStorage
          this.userService.emitUserLoggedIn(response.user); // Emitir el evento de inicio de sesión
          this.router.navigate(['/home']); // Redirigir al usuario a la página de inicio
        },
        error => {
          console.error('Error en el inicio de sesión:', error);
        }
      );
    }
  }
}
