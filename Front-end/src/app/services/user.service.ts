// user.service.ts
import { Injectable } from "@angular/core";
import { Global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { IUser } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public url: string;
    private userLoggedInSource = new Subject<IUser>();

    userLoggedIn$ = this.userLoggedInSource.asObservable(); // Observable para el evento de inicio de sesión

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    // Registro de usuario
    registerUser(user: IUser): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'usuarioRegistrar', JSON.stringify(user), { headers: headers });
    }

    // Login de usuario
    loginUser(user: { email: string, password: string }): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'usuarioLogin', JSON.stringify(user), { headers: headers });
    }

    // Emitir evento de inicio de sesión
    emitUserLoggedIn(user: IUser): void {
        this.userLoggedInSource.next(user);
    }

    // Obtener usuario por ID
    getUser(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'usuarioGet/' + id, { headers: headers });
    }
}
