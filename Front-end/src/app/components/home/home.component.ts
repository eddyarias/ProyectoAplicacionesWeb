import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../modules/juego';
import { Global } from '../../services/global';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { response } from 'express';
import { Review } from '../../modules/review';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [JuegoService, ReviewService, UserService]
  
})
export class HomeComponent implements OnInit{
  public url:string;
  public juegosPopulares:Juego[];
  public reviews:Review[];

  constructor(
    private _servicePelicula:JuegoService,
    private _serviceReview:ReviewService,
    private _serviceUsuario:UserService
  ){
    this.url = Global.url;
    this.juegosPopulares = [];
    this.reviews = [];
  }
  
  ngOnInit(): void {
    this.getGames();
    this.getReviews();
  }

  getGames(){
    this._servicePelicula.getGames().subscribe(
      response => {
        if(response.games){
          this.juegosPopulares = response.games.slice(0,8);
        }
      },
      error => {  
        console.log(error);
      }
    )
  }

  getReviews(){
    this._serviceReview.getReviews().subscribe(
      response => {
        if(response.reviews){
          this.reviews = response.reviews.slice(0,3);

          this.reviews.forEach(review => {
            this._serviceUsuario.getUser(review.user_id).subscribe(
              response => {
                review['userName'] = response.user.nombre;
                review['userImage'] = response.user.imagen;
              }
            )
          });
        }
      },
      error => {
        console.log(error);
      }
    )
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
}


