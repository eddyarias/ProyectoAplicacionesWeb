import { Injectable } from "@angular/core";
import { Global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ReviewService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url
    }

    //Ver todas las resenias
    getReviews():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'resenia');
    }

    //Ver todas las resenias de un juego
    getGameReviews(){

    }
}