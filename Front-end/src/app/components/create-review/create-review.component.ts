import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Review } from '../../modules/review';
import { Global } from '../../services/global';
import { ReviewService } from '../../services/review.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css',
  providers: [ReviewService]
})
export class CreateReviewComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();  // Emite un evento cuando se cierra el modal
  public review: Review;
  public url:string;  
  public status:string;
  public isVisible: boolean;
  public rating: number = 0;  // Para almacenar la calificación

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

  saveReview(form: NgForm){
    console.log(this.review);  // Verifica el contenido antes de enviarlo
  
    this._reviewService.saveReview(this.review).subscribe(
      response => {
        if(response.review){
          this.status = 'success';
          this._notificationService.showNotification('Reseña guardada con éxito', 'success');
          this.closeModal();
        }else{
          this.status = 'failed';
          this._notificationService.showNotification('No se pudo guardar la reseña', 'error');
          form.reset();
        }
        console.log(this.status);
      },
      error => {  
        console.error("Error al guardar la reseña: ", error);  // Imprime el error en la consola
      }
    );
  }
}
