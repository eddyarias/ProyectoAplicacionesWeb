import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Global } from "./global";
import { Observable } from "rxjs";

@Injectable()
export class JuegoService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url;
    }

    //Ver todas las peliculas   https://localhost:3600/peliculas
    getGames():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');        
        return this._http.get(this.url+'get-juegos',{headers:headers});
    } 

    //ver juego 
    getGame(id:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-juego/'+id, {headers:headers});
    }

    
}