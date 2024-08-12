import { Component, OnInit } from '@angular/core';
import { Juego } from '../../modules/juego';
import { JuegoService } from '../../services/juego.service';
import { Global } from '../../services/global';
import { ActivatedRoute} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Review } from '../../modules/review';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule, CommonModule ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [JuegoService, ReviewService, UserService]
})
export class AddProductComponent implements OnInit{
  public url:string;
  public juego: Juego;
  public gameReviews: Review[];
  public mostrarDescripcionSection: boolean;
  public mostrarReviewsSection: boolean;
  public botonSeleccionado:string;


  constructor(
    private _juegoService:JuegoService,
    private _reviewService: ReviewService,
    private _userService: UserService,
    private _route:ActivatedRoute
  ){
    this.url=Global.url;
    this.juego=new Juego('',1,'','',1,1,'');
    this.gameReviews = [];
    this.mostrarDescripcionSection = true;
    this.mostrarReviewsSection = false;
    this.botonSeleccionado = 'descripcion';
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        let id = params['id']; //obetener el id de la url
        this.getJuego(id);
        this.getGameReviews(id);
      }
    )
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

  getGameReviews(id: string){
    this._reviewService.getGameReviews(id).subscribe(
      response => {
        if(response.reviews){
          this.gameReviews = response.reviews;

          // Recorrer cada reseña para obtener la información del usuario
          this.gameReviews.forEach( review => {
            this._userService.getUser(review.user_id.toString()).subscribe(
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

  promedioRating(): number{
    let gameRating = 0;
    let aux = 0;

    if(this.gameReviews.length == 0) return 0;

    this.gameReviews.forEach( review => {
      gameRating += review.rating;
      aux++; 
    })
    console.log("jsofjlas");
    console.log(gameRating/aux);
    return gameRating/aux;
  }

  getGameStarData(){
    const rating = this.promedioRating();
    const fullStar = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStar = 5 - fullStar - ( halfStar ? 1:0);

    return{
      fullStar,
      halfStar,
      emptyStar
    }
  }
}
