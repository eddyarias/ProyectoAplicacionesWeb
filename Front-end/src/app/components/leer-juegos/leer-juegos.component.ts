import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../../services/juego.service';
import { Global } from '../../services/global';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leer-juegos',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './leer-juegos.component.html',
  styleUrls: ['./leer-juegos.component.css']
})
export class LeerJuegoComponent implements OnInit {
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
}