// actualizar-juego.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../modules/juego'; // Asegúrate de que la ruta sea correcta
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-juego',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actualizar-juego.component.html',
  styleUrls: ['./actualizar-juego.component.css'], // Corregido el nombre de la propiedad
  providers: [JuegoService]
})

export class ActualizarJuegoComponent implements OnInit {
  @Input() public juegoId: string = '';
  public juego: Juego = new Juego('', '', '', 0, 0, 0, 0, '', '', '');

  constructor(private _juegoService: JuegoService) {}

  ngOnInit() {
    this.cargarJuego();
  }

  cargarJuego() {
    this._juegoService.getGame(this.juegoId).subscribe(
      response => {
        if (response.game) {
          this.juego = response.game;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  actualizarJuego(form: NgForm) {
    this._juegoService.updateGame(this.juegoId, this.juego).subscribe(
      response => {
        if (response.game) {
          form.reset();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
