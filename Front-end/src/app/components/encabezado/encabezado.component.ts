import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service'; // Importa el servicio de usuario

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'] // Corregido "styleUrl" a "styleUrls"
})
export class EncabezadoComponent implements OnInit {
  searchTerm: string = '';
  public nombreUsuario: string | null = '';

  // Inyecta el servicio Router y UserService en el constructor
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.checkLoggedInUser();

    // Suscribirse al evento de inicio de sesión
    this.userService.userLoggedIn$.subscribe(user => {
      this.nombreUsuario = user.nombre;
    });
  }

  checkLoggedInUser() {
    if (typeof window !== 'undefined' && localStorage) { // Verifica si 'window' y 'localStorage' están disponibles
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        this.nombreUsuario = parsedUser.nombre;
      }
    }
  }

  buscarJuego() {
    if (this.searchTerm) {
      // Usa el método navigate del Router para redirigir a la ruta deseada
      this.router.navigate(['/juego/nombre', this.searchTerm]);
    }
  }

  logout() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('user');
    }
    this.nombreUsuario = null;
    this.router.navigate(['/home']); // Redirigir al usuario a la página de inicio después de cerrar sesión
  }
}
