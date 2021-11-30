import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url;

  constructor(
    private _http:HttpClient
    ) { 
    this.url = GLOBAL.url;
  }

  obtener_productos_slug_publico(slug: any):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_productos_slug_publico/'+ slug, {headers:headers});
  }

  listar_productos_recomendados_publico(categoria: any):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'listar_productos_recomendados_publico/'+ categoria, {headers:headers});
  }

  get_ciudades():Observable<any> {
    return this._http.get('./assets/ciudades.json');
  }

  get_provincias():Observable<any> {
    return this._http.get('./assets/provincias.json');
  }

  get_comunidades_autonomas():Observable<any> {
    return this._http.get('./assets/comunidades_autonomas.json');
  }

  get_envios():Observable<any> {
    return this._http.get('./assets/envios.json');
  }

  obtener_descuento_activo():Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_descuento_activo', {headers:headers});
  }

  listar_productos_nuevos_publico():Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'listar_productos_nuevos_publico', {headers:headers});
  }

  listar_productos_masvendidos_publico():Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'listar_productos_masvendidos_publico', {headers:headers});
  }

  enviar_mensaje_contacto(data: any):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'enviar_mensaje_contacto/', data, {headers:headers});
  }

  obtener_reviews_producto_publico(id: any):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_reviews_producto_publico/'+ id, {headers:headers});
  }

  obtener_productos_id_publico(id:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_productos_id_publico/'+ id, {headers:headers});
  }
  
}
