// crear-juego.component.ts
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../modules/juego';

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css'],
  providers: [JuegoService]
})
export class CrearJuegoComponent {
  public juego: Juego = new Juego('', '', '', 0, 0, 0, 0, '', '', '');
  public archivoSeleccionado: File | null = null;
  public status: string = '';
  public idGuardado: string = '';

  @ViewChild('archivoImagen') fileInput: any;

  constructor(private _juegoService: JuegoService) {}

  crearJuego(form: NgForm) {
    this._juegoService.createGame(this.juego).subscribe(
      response => {
        if (response.juego) {
          if (this.archivoSeleccionado) {
            this._juegoService.uploadImage(response.juego._id, this.archivoSeleccionado).subscribe(
              result => {
                this.juego = result.response;
                this.status = 'success';
                this.idGuardado = result.juego._id;
                form.reset();
                this.fileInput.nativeElement.value = '';
              },
              error => {
                this.status = 'failed';
                console.error('Error al subir la imagen:', error);
              }
            );
          } else {
            this.status = 'success';
            form.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.error('Error al crear el juego:', error);
        this.status = 'failed';
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivoSeleccionado = event.target.files[0];
    }
  }
}
