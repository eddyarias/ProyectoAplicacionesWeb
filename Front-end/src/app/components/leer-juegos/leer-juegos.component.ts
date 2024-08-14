// leer-juegos.component.ts
import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../modules/juego';

@Component({
  selector: 'app-leer-juegos',
  standalone: true,
  imports: [],
  templateUrl: './leer-juegos.component.html',
  styleUrl: './leer-juegos.component.css',
  providers: [JuegoService]
})

export class LeerJuegosComponent implements OnInit {
  public juegos: Juego[] = [];

  constructor(private _juegoService: JuegoService) {}

  ngOnInit() {
    this.cargarJuegos();
  }

  cargarJuegos() {
    this._juegoService.getGames().subscribe(
      response => {
        if (response.games) {
          this.juegos = response.games;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarJuego(id: string) {
    this._juegoService.deleteGame(id).subscribe(
      response => {
        this.cargarJuegos(); // Reload the list after deletion
      },
      error => {
        console.log(error);
      }
    );
  }
}
