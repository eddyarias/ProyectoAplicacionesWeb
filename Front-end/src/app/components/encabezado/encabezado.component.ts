import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterModule, FormsModule ],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {
  searchTerm: string = '';

  // Inyecta el servicio Router en el constructor
  constructor(private router: Router) {}

  buscarJuego() {
    if (this.searchTerm) {
      // Usa el método navigate del Router para redirigir a la ruta deseada
      this.router.navigate(['/juego/nombre', this.searchTerm]);
    }
  }
}
