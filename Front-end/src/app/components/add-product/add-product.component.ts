import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Juego } from '../../modules/juego';
import { JuegoService } from '../../services/juego.service';
import { Global } from '../../services/global';
import { ActivatedRoute, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Review } from '../../modules/review';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CreateReviewComponent } from "../create-review/create-review.component";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, CreateReviewComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [JuegoService, ReviewService, UserService]
})
export class AddProductComponent implements OnInit{
  @ViewChild(CreateReviewComponent) modal!: CreateReviewComponent;
  public url:string;
  public juego: Juego;
  public gameReviews: Review[];
  public mostrarDescripcionSection: boolean;
  public mostrarReviewsSection: boolean;
  public botonSeleccionado:string;
  public juegosRelacionados: Juego[];
  public mostrarCreateRevies:boolean;


  constructor(
    private _juegoService:JuegoService,
    private _reviewService: ReviewService,
    private _userService: UserService,
    private _route:ActivatedRoute
  ){
    this.url=Global.url;
    this.juego=new Juego('', '','',1,1,1,1,'','','');
    this.gameReviews = [];
    this.mostrarDescripcionSection = true;
    this.mostrarReviewsSection = false;
    this.botonSeleccionado = 'descripcion';
    this.juegosRelacionados = [];
    this.mostrarCreateRevies = false;
  }

  ngOnInit(): void {
    let string = "";

    this._route.params.subscribe(
      params=>{
        let id = params['id']; //obetener el id de la url
        //let nombre=params['nombre'];
        //this.getJuegoPorNombre(nombre);
        this.getJuego(id);
        this.getGameReviews(id);
      }
    )
    string = "plataforma="+this.juego.plataforma+"&genero="+this.juego.genero;
    this.getJuegosRelacionado(string);

  }

  getJuego(id:string){
    this._juegoService.getGame(id).subscribe(
      response=>{
        this.juego=response.game;
      },
      error=>{
        console.log(error);
      }
    )
  }

  /*getJuegoPorNombre(nombre: string) {
    this._juegoService.getGameByName(nombre).subscribe(
      response => {
        this.juego = response.game; 
      },
      error => {
        console.log(error);
      }
    );
}*/


  getGameReviews(id: string){
    this._reviewService.getGameReviews(id).subscribe(
      response => {
        if(response.reviews){
          this.gameReviews = response.reviews;

          // Recorrer cada reseña para obtener la información del usuario
          this.gameReviews.forEach( review => {
            this._userService.getUser(review.user_id).subscribe(
              response => {
                review['userName'] = response.user.nombre;
                review['userImage'] = response.user.imagen;              
              },
              error => {
                console.log(error);
              }
            )
          })

        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getJuegosRelacionado(filtro: string){
    console.log(filtro)
    this._juegoService.getGamesByFilter(filtro).subscribe(
      response => {
        this.juegosRelacionados = response.games
      },
      error => {
        console.log(error);
      }
    )

  }

  mostrarDescripcion(){
    this.mostrarDescripcionSection = true;
    this.mostrarReviewsSection = false;
    this.botonSeleccionado = 'descripcion'
  }

  mostrarReviews(){
    this.mostrarDescripcionSection = false;
    this.mostrarReviewsSection = true;
    this.botonSeleccionado = 'reviews'
  }

  getGameStarData(rating:number){
    const fullStar = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStar = 5 - fullStar - ( halfStar ? 1:0);

    return{
      fullStar,
      halfStar,
      emptyStar
    }
  }


  abrirCreateReview() {
    this.mostrarCreateRevies = true;
  
    setTimeout(() => {
      this.modal.openModal();
      this.modal.review.producto_id = this.juego._id;
      this.modal.review.user_id = "66b70b57831e003dfc20bd92"
    }, 1); // Esto permite que el modal se cree antes de llamar a openModal



  }

  cerrarCreateReview() {
    this.mostrarCreateRevies = false;
  }
}


