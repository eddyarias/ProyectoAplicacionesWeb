import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-juego',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule], // Importar FormsModule
  templateUrl: './actualizar-juego.component.html',
  styleUrls: ['./actualizar-juego.component.css']
})
export class ActualizarJuegoComponent implements OnInit {
  juegos: any[] = [];  // Almacena la lista de juegos
  selectedGame: any = null;  // Almacena el juego seleccionado para actualización
  updateForm: FormGroup;  // Formulario de actualización

  constructor(private juegoService: JuegoService, private fb: FormBuilder) {
    // Inicializa el formulario con validaciones
    this.updateForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],  // Asegura que el stock sea un número entero
      sku: ['', [Validators.required]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      plataforma: ['', [Validators.required]],
      genero: ['', [Validators.required]],
    });
  }

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

  selectGame(game: any): void {
    this.selectedGame = game;
    this.updateForm.patchValue({
      nombre: game.nombre,
      descripcion: game.descripcion,
      precio: game.precio,
      stock: game.stock,
      sku: game.sku,
      rating: game.rating,
      plataforma: game.plataforma,
      genero: game.genero,
    });
  }

  updateGame(): void {
    if (this.updateForm.valid && this.selectedGame) {
      this.juegoService.updateGame(this.selectedGame._id, this.updateForm.value).subscribe(
        response => {
          console.log('Juego actualizado con éxito', response);
          this.loadGames();  // Recargar la lista de juegos después de actualizar uno
        },
        error => {
          console.error('Error al actualizar el juego', error);
        }
      );
    }
  }
}
