import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../modules/juego';
import { Global } from '../../services/global';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [JuegoService]
  
})
export class HomeComponent implements OnInit{
  public juegos:Juego[];
  public url:string;
  public juegosPopulares:Juego[];

  constructor(
    private _servicePelicula:JuegoService
  ){
    this.juegos = [];
    this.url = Global.url;
    this.juegosPopulares = [];
  }
  
  ngOnInit(): void {
    this.getGames();
  }

  getGames(){
    this._servicePelicula.getGames().subscribe(
      response => {
        if(response.games){
          this.juegos = response.games;
          this.juegosPopulares = this.juegos.slice(0,8);
        }
      },
      error => {  
        console.log(error);
      }
    )
  }
}


