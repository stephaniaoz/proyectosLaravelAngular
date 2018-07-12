import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(
    public _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  pruebas(){
    return "hola mundo!! ";
  }

  //usamos este metódo en nuestro componente (register.component.ts)
  register(user): Observable<any>{
    //Convertir en un json string, convierte el objeto user a un json string el cual podremos enviar por post facilmente
    let json = JSON.stringify(user);
    //parametros que vamos a enviar por post (el api recibe esto)
    let params = 'json='+json;
    //cabecera de la petición que vamos a hacer, enviamos los datos con esa cabecera
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    //hacemos la petición ayax: despues de la url le pasamos el método del api en laravel, en este caso la ruta del registro es (Route::post('/api/registrer','UserController@registrer');), paso los datos a enviar(params) y por último la cabecera
    return this._http.post(this.url+'registrer', params, {headers:headers});
  }

  signup(user, gettoken = null): Observable<any>{
    if(gettoken != null){
      user.gettoken = 'true';
    }
    //Convertir en un json string, convierte el objeto user a un json string el cual podremos enviar por post facilmente
    let json = JSON.stringify(user);
    //parametros que vamos a enviar por post (el api recibe esto)
    let params = 'json='+json;
    //cabecera de la petición que vamos a hacer, enviamos los datos con esa cabecera
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    //hacemos la petición ayax: despues de la url le pasamos el método del api en laravel, en este caso la ruta del registro es (Route::post('/api/registrer','UserController@registrer');), paso los datos a enviar(params) y por último la cabecera
    return this._http.post(this.url+'login', params, {headers:headers});
  }

  //acceder al localstorage
  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }


}
