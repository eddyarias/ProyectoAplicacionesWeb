import { Injectable } from "@angular/core";
import { Global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Review } from "../modules/review";

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
        return this._http.get(this.url + 'get-reviews',{headers:headers});
    }

    //Ver todas las resenias de un juego
    getGameReviews(id:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'get-game-reviews/'+id, {headers:headers})
    }

    //Guardar una review
    saveReview(review:Review):Observable<any>{
        let params = JSON.stringify(review);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url+'save-review', params, {headers:headers})
    }
}