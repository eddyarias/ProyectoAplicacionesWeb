import { Component, OnInit, ViewChild } from '@angular/core';
import { Juego } from '../../modules/juego';
import { JuegoService } from '../../services/juego.service';
import { Global } from '../../services/global';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Review } from '../../modules/review';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CreateReviewComponent } from "../create-review/create-review.component";
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { NotificationService } from '../../services/notification.service';
import { UpdateReviewComponent } from '../update-review/update-review.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, CreateReviewComponent, UpdateReviewComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [JuegoService, ReviewService, UserService]
})
export class AddProductComponent implements OnInit {
  @ViewChild(CreateReviewComponent) modalCreate!: CreateReviewComponent;
  @ViewChild(UpdateReviewComponent) modalUpdate!: UpdateReviewComponent;

  public url: string;
  public juego: Juego;
  public gameReviews: Review[];
  public mostrarDescripcionSection: boolean;
  public mostrarReviewsSection: boolean;
  public botonSeleccionado: string;
  public juegosRelacionados: Juego[];
  public mostrarCreateRevies: boolean;
  public verOpcionesED: boolean;
  constructor(
    private _juegoService: JuegoService,
    private _reviewService: ReviewService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService
  ) {
    this.url = Global.url;
    this.juego = new Juego('', '', '', 1, 1, 1, 1, '', '', '');
    this.gameReviews = [];
    this.mostrarDescripcionSection = true;
    this.mostrarReviewsSection = false;
    this.botonSeleccionado = 'descripcion';
    this.juegosRelacionados = [];
    this.mostrarCreateRevies = false;
    this.verOpcionesED = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id']; //obtener el id de la url
      this.getJuego(id);
      this.getGameReviews(id);
    });

    
    setTimeout(() => { 
      let string = "plataforma="+this.juego.plataforma+"&genero="+this.juego.genero;
      this.getJuegosRelacionado(string);
    }, 1000);

  }

  getJuego(id: string) {
    this._juegoService.getGame(id).subscribe(
      response => {
        this.juego = response.game;
      },
      error => {
        console.log(error);
      }
    );
  }

  getGameReviews(id: string) {
    this._reviewService.getGameReviews(id).subscribe(
      response => {
        if (response.reviews) {
          this.gameReviews = response.reviews;

          // Recorrer cada reseña para obtener la información del usuario
          this.gameReviews.forEach(review => {
            this._userService.getUser(review.user_id).subscribe(
              response => {
                review['userName'] = response.user.nombre;
                review['userImage'] = response.user.imagen;
              },
              error => {
                console.log(error);
              }
            );
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getJuegosRelacionado(filtro: string) {
    this._juegoService.getGamesByFilter(filtro).subscribe(
      response => {
        this.juegosRelacionados = response.games;
      },
      error => {
        console.log(error);
      }
    );
  }

  mostrarDescripcion() {
    this.mostrarDescripcionSection = true;
    this.mostrarReviewsSection = false;
    this.botonSeleccionado = 'descripcion';
  }

  mostrarReviews() {
    this.mostrarDescripcionSection = false;
    this.mostrarReviewsSection = true;
    this.botonSeleccionado = 'reviews';
  }

  getGameStarData(rating: number) {
    const fullStar = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStar = 5 - fullStar - (halfStar ? 1 : 0);

    return {
      fullStar,
      halfStar,
      emptyStar
    };
  }

  addToCart() {
    Swal.fire({
      title: '¿Está seguro de que desea agregar este producto al carrito?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const cart = localStorage.getItem('cart');
        let cartItems = cart ? JSON.parse(cart) : [];

        // Check if the item is already in the cart
        const existingItem = cartItems.find((item: any) => item._id === this.juego._id);

        if (existingItem) {
          existingItem.cantidad += 1;
        } else {
          cartItems.push({ ...this.juego, cantidad: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));

        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          text: 'El producto ha sido agregado al carrito exitosamente.',
          confirmButtonText: 'Continuar'
        });
      }
    });
  }

  abrirCreateUpdateReview(type: string, idReview: string) {
    const user = localStorage.getItem('user')
    if(user){
      const parsedUser = JSON.parse(user);
      const userId = parsedUser._id

      if(type == 'create'){
        this.mostrarCreateRevies = true;

        setTimeout(() => {
          this.modalCreate.openModal();
          this.modalCreate.review.producto_id = this.juego._id;
          this.modalCreate.review.user_id = userId;
        }, 1); // Esto permite que el modal se cree antes de llamar a openModal
      }else{
        this.mostrarCreateRevies = true;

        setTimeout(() => {

          this.modalUpdate.openModal();
          this.modalUpdate.review.producto_id = this.juego._id;
          this.modalUpdate.review.user_id = userId;
          this.modalUpdate.review._id = idReview;
        }, 1); // Esto permite que el modal se cree antes de llamar a openModal
       
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No estás logueado',
        text: 'Debes iniciar sesión para poder agregar una reseña.',
        confirmButtonText: 'Aceptar'
      }); 
    }
  }


  activarOpcionesReview(userIdReview: string): boolean { //para activa la opcion de poder editar segun el usuario
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const userId = parsedUser._id;
  
      if (userId === userIdReview) {
        return true;
      }
    }
    return false;
    
  }

  verOpciones(){
    this.verOpcionesED = true;

    console.log(this.verOpcionesED)
  }

  cerrarCreateReview() {
    this.mostrarCreateRevies = false;
    this.verOpcionesED = false;
    this.ngOnInit();
  }


  deleteReview(reviewId:string){
    if(confirm('¿Estás seguro de que deseas eliminar tu resña?')){
      this._reviewService.deleteReview(reviewId).subscribe(
        response =>{
            this._notificationService.showNotification("Reseña eliminada con exito", 'success');
        }
      )
    }

    setTimeout(() => { 
      this.ngOnInit();
    }, 1000);

  }
  
}
