// eliminar-juego.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { JuegoService } from '../../services/juego.service';

@Component({
  selector: 'app-eliminar-juego',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-juego.component.html',
  styleUrl: './eliminar-juego.component.css',
  providers: [JuegoService]
})

export class EliminarJuegoComponent implements OnInit {
  @Input() public juegoId: string = '';

  constructor(private _juegoService: JuegoService) {}

  ngOnInit(): void {}

  eliminarJuego() {
    if (confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      this._juegoService.deleteGame(this.juegoId).subscribe(
        response => {
          alert('Juego eliminado exitosamente.');
        },
        error => {
          console.log(error);
          alert('Error al eliminar el juego.');
        }
      );
    }
  }
}
