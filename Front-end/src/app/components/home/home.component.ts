import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../modules/juego';
import { Global } from '../../services/global';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [JuegoService]
  
})
export class HomeComponent implements OnInit{
  public juegos:Juego[];
  public url:string;

  constructor(private _servicePelicula:JuegoService) {
    this.juegos = [];
    this.url = Global.url;
  }
  
  ngOnInit(): void {
    this.getGames();
  }

  getGames(){
    this._servicePelicula.getGames().subscribe(
      response => {
        if(response.juegos){
          this.juegos = response.juegos;
        }
      },
      error => {  
        console.log(error);
      }
    )
  }
}
