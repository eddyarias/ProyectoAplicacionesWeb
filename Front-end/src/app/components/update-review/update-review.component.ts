import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Review } from '../../modules/review';
import { ReviewService } from '../../services/review.service';
import { NotificationService } from '../../services/notification.service';
import { Global } from '../../services/global';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-review',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: '../create-review/create-review.component.html',
  styleUrl: '../create-review/create-review.component.css',
  providers: [ReviewService]
})
export class UpdateReviewComponent implements OnInit{
  @Output() onClose = new EventEmitter<void>();  // Emite un evento cuando se cierra el modal

  public review: Review;
  public url:string;  
  public status:string;
  public isVisible: boolean;
  public rating: number = 0;  // Para almacenar la calificación
  public titulo: string = "Editar Comentario";
  public especificacion: string = "¿Cómo has cambiado tu experiencia con el juego? Actualiza tu opinión aquí."

  constructor(
    private _reviewService:ReviewService,
    private _notificationService:NotificationService
  ){
    this.review =  new Review('','','',1,'');
    this.url = Global.url
    this.status = '';
    this.isVisible = false;
  } 

  ngOnInit(): void {
    console.log("");
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.onClose.emit();
  }

  setRating(star: number) {
    this.rating = star;
    this.review.rating = star;  // Actualizar el rating en el objeto review
  }

  saveUpdateReview(form: NgForm){
    console.log(this.review)
    this._reviewService.updateReview(this.review).subscribe(
      response => {
          this._notificationService.showNotification('Reseña actualizada con éxito', 'success');
          this.closeModal();
      },
      error => {  
        console.error("Error al actualizar la reseña: ", error);  // Imprime el error en la consola
      }
    );
  }
}
