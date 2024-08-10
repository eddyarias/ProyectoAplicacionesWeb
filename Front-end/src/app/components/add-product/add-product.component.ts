import { Component, OnInit } from '@angular/core';
import { Juego } from '../../modules/juego';
import { JuegoService } from '../../services/juego.service';
import { Global } from '../../services/global';
import { ActivatedRoute} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [JuegoService]
})
export class AddProductComponent implements OnInit{
  public url:string;
  public juego: Juego;


  constructor(
    private _juegoService:JuegoService,
    private _route:ActivatedRoute
  ){
    this.url=Global.url;
    this.juego=new Juego('',1,'','',1,1,'');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        let id = params['id']; //obetener el id de la url
        this.getJuego(id);
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



}
