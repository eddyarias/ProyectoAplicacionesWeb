import { Component } from '@angular/core';
import { JuegoService } from '../../services/juego.service';  // Asegúrate de que la ruta del servicio sea correcta
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-juego',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent {
  game = {
    nombre: '',
    descripcion: '',
    precio: null,
    stock: null,
    sku: '',
    rating: null,
    plataforma: '',
    genero: '',
    portada: ''
  };
  
  portadaSeleccionada: File | null = null;  // Aquí se almacena el archivo de portada seleccionado, permitiendo null

  constructor(private juegoService: JuegoService, private router: Router) {}

  // Método para manejar la selección de archivo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.game.portada = input.files[0].name;
    }
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.juegoService.createGame(this.game).subscribe(
      response => {
        console.log('Juego creado con éxito', response);
        if (this.game.portada) {
          // Si deseas subir la imagen, puedes hacerlo aquí.
          // Asegúrate de que el servicio de carga de imagen esté correctamente definido en tu servicio.
          this.juegoService.uploadImage(response.game._id, this.game.portada).subscribe(
            () => {
              console.log('Imagen subida con éxito');
              this.router.navigate(['/']);  // Redirige a la página principal u otra página deseada
            },
            error => {
              console.error('Error al subir la imagen', error);
            }
          );
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
        console.error('Error al crear el juego', error);
      }
    );
  }
}