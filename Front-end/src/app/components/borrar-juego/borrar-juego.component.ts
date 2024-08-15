import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrar-juego',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './borrar-juego.component.html',
  styleUrls: ['./borrar-juego.component.css']
})
export class BorrarJuegoComponent implements OnInit {
  juegos: any[] = [];  // Almacena la lista de juegos

  constructor(private juegoService: JuegoService) {}

  ngOnInit(): void {
    this.loadGames();  // Carga todos los juegos al inicializar el componente
  }

  loadGames(): void {
    this.juegoService.getGames().subscribe(
      response => {
        if (response.games) {
          this.juegos = response.games;
        }
      },
      error => {
        console.error('Error al obtener los juegos', error);
      }
    );
  }

  deleteGame(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      this.juegoService.deleteGame(id).subscribe(
        response => {
          console.log('Juego eliminado con éxito', response);
          this.loadGames();  // Recargar la lista de juegos después de eliminar uno
        },
        error => {
          console.error('Error al eliminar el juego', error);
        }
      );
    }
  }
}
