// user.service.ts
import { Injectable } from "@angular/core";
import { Global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../models/user"; // Asegúrate de que la ruta sea correcta

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class UserService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url;
    }

    // Registro de usuario
    registerUser(user: IUser): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'usuarioRegistrar', JSON.stringify(user), {headers: headers});
    }

    // Login de usuario
    loginUser(user: { email: string, password: string }): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'usuarioLogin', JSON.stringify(user), {headers: headers});
    }

    // Obtener usuario por ID
    getUser(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'usuarioGet/' + id, {headers: headers});
    }
}
