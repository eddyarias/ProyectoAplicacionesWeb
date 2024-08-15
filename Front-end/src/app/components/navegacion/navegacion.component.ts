import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { JuegoService } from '../../services/juego.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,RouterModule], // Asegurarse de que FormsModule esté en los imports
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
  providers: [JuegoService]
})
export class NavegacionComponent {

  juegosFiltrados: any[] = [];
  consoles = [
    { name: 'PlayStation 4', selected: false },
    { name: 'PC', selected: false },
    { name: 'Nintendo Switch', selected: false }
  ];

  availability = [
    { name: 'En stock', selected: false }
  ];

  constructor(private _juegoService: JuegoService) { }

  ngOnInit(): void {
    this.applyFilters(); // Inicializa la carga de juegos si es necesario
  }

  resetCategory(category: string): void {
    switch (category) {
      case 'console':
        this.consoles.forEach(item => item.selected = false);
        break;
      case 'availability':
        this.availability.forEach(item => item.selected = false);
        break;
    }
    this.applyFilters(); // Aplicar filtros después de resetear
  }

  applyFilters(): void {
    const filters: any = {};

    const selectedConsoles = this.consoles.filter(item => item.selected).map(item => item.name);
    if (selectedConsoles.length > 0) {
      filters.plataforma = selectedConsoles.join(',');
    }

    const stockAvailable = this.availability.find(item => item.selected);
    if (stockAvailable) {
      filters.stock = true;
    }

    this._juegoService.getFilteredGames(filters).subscribe(
      response => {
        if (response.games) {
          this.juegosFiltrados = response.games; // Almacenar juegos filtrados
        } else {
          this.juegosFiltrados = []; // Limpiar la lista si no hay juegos
        }
      },
      error => {
        console.log('Error al obtener los juegos filtrados:', error);
      }
    );
  }
}
