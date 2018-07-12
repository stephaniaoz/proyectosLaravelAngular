import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Pais } from '../models/pais';

@Injectable()
export class PaisService {
  public url: string;

  constructor(
    public _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  pruebas(){
    return "hola mundo!! ";
  }

  create(token, pais:Pais): Observable<any>{
    let json = JSON.stringify(pais);
    let params = 'json='+json;
    //cabecera de la petición que vamos a hacer, enviamos los datos con esa cabecera
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    //hacemos la petición ayax: despues de la url le pasamos el método del api en laravel, en este caso la ruta del car es (Route::post('/api/car','UserController@store');), paso los datos a enviar(params) y por último la cabecera
    return this._http.post(this.url+'pais', params, {headers:headers});
  }

  getPaises(): Observable<any>{
    //cabecera de la petición que vamos a hacer, enviamos los datos con esa cabecera
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    //por metodo get la ruta pais de laravel
    return this._http.get(this.url + 'pais', {headers:headers});
  }

  getPais(id): Observable<any>{
    return this._http.get(this.url + 'pais/' + id);
  }

  update(token, car, id) : Observable<any>{
    let json = JSON.stringify(car);
    let params = "json="+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    return this._http.put(this.url + 'pais/' + id, params, {headers: headers});

  }

  delete(token, id) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    return this._http.delete(this.url + 'pais/' + id, {headers: headers});
  }

}
