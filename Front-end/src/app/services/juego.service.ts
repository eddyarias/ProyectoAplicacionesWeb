import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Global } from "./global";

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class JuegoService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    // Obtener todos los juegos
    getGames(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'get-juegos', { headers: headers })
            .pipe(
                catchError(error => {
                    console.error('Error al obtener los juegos', error);
                    return throwError(error);
                })
            );
    }

    // Obtener un juego por ID
    getGame(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'get-juego/' + id, { headers: headers });
    }

    // Crear un nuevo juego
    createGame(game: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'save-juego', JSON.stringify(game), { headers: headers });
    }
     // Cargar imagen para un juego
     uploadImage(gameId: string, image: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('image', image, image.name);

        return this._http.post(this.url + 'upload-imagen/' + gameId, formData);
    }

    // Actualizar un juego existente
    updateGame(id: string, game: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'update-juego/' + id, JSON.stringify(game), { headers: headers });
      }

    // Eliminar un juego
    deleteGame(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'delete-juego/' + id, { headers: headers });
    }

    // Obtener juegos filtrados
    getFilteredGames(filters: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');        
        // Construcción dinámica de los parámetros de consulta
        let query = Object.keys(filters)
                          .map(key => `${key}=${encodeURIComponent(filters[key])}`)
                          .join('&');

        return this._http.get(this.url + 'get-juegos-por-filtros?' + query, { headers: headers });
    }

    getGamesByFilter(filtro:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-juegos-por-filtros?'+filtro, {headers:headers})
    }    
}

