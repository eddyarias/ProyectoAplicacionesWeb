import { Injectable } from "@angular/core";
import { Global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UserService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url
    }

    //Ver usuario
    getUser(id:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'usuarioGet/'+id,{headers:headers});
    }
}