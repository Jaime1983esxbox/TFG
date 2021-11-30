"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteService = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("./GLOBAL");
var http_1 = require("@angular/common/http");
var angular_jwt_1 = require("@auth0/angular-jwt");
var ClienteService = /** @class */ (function () {
    function ClienteService(_http) {
        this._http = _http;
        this.url = GLOBAL_1.GLOBAL.url;
    }
    ClienteService.prototype.login_cliente = function (data) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login_cliente', data, { headers: headers });
    };
    ClienteService.prototype.obtener_cliente_guest = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_cliente_guest/' + id, { headers: headers });
    };
    ClienteService.prototype.actualizar_perfil_cliente_guest = function (id, data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.put(this.url + 'actualizar_perfil_cliente_guest/' + id, data, { headers: headers });
    };
    // Para validar el token
    ClienteService.prototype.isAuthenticated = function () {
        var token = localStorage.getItem('token');
        // Verificamos si hay un token
        if (!token) {
            return false;
        }
        // Verificamos si el token es válido
        try {
            var helper = new angular_jwt_1.JwtHelperService();
            // Decodifica el token y manda la data del usuario
            var decodedToken = helper.decodeToken(token);
            console.log(decodedToken);
            if (helper.isTokenExpired(token)) {
                localStorage.clear();
                return false;
            }
            if (!decodedToken) {
                localStorage.clear();
                return false;
            }
        }
        catch (error) {
            localStorage.clear();
            return false;
        }
        return true;
    };
    ClienteService.prototype.obtener_config_publico = function () {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'obtener_config_publico', { headers: headers });
    };
    ClienteService.prototype.listar_productos_publico = function (filtro) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'listar_productos_publico/' + filtro, { headers: headers });
    };
    ClienteService.prototype.agregar_carrito_cliente = function (data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.post(this.url + 'agregar_carrito_cliente/', data, { headers: headers });
    };
    ClienteService.prototype.obtener_carrito_cliente = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_carrito_cliente/' + id, { headers: headers });
    };
    ClienteService.prototype.eliminar_carrito_cliente = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http["delete"](this.url + 'eliminar_carrito_cliente/' + id, { headers: headers });
    };
    ClienteService.prototype.registro_direccion_cliente = function (data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.post(this.url + 'registro_direccion_cliente', data, { headers: headers });
    };
    ClienteService.prototype.obtener_direccion_todos_cliente = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_direccion_todos_cliente/' + id, { headers: headers });
    };
    ClienteService.prototype.cambiar_direccion_principal_cliente = function (id, cliente, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.put(this.url + 'cambiar_direccion_principal_cliente/' + id + '/' + cliente, { data: true }, { headers: headers });
    };
    ClienteService.prototype.obtener_direccion_principal_cliente = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_direccion_principal_cliente/' + id, { headers: headers });
    };
    ClienteService.prototype.registro_compra_cliente = function (data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.post(this.url + 'registro_compra_cliente', data, { headers: headers });
    };
    // get_token_culqi(data: any):Observable<any> {
    //   let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer pk_test_0b07aceaa3de8c43');
    //   return this._http.post('https://secure.culqi.com/v2/tokens', data, {headers:headers});
    // }
    // get_charge_culqi(data: any):Observable<any> {
    //   let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer sk_test_56683314fd8a5328');
    //   return this._http.post('https://api.culqi.com/v2/charges', data, {headers:headers});
    // }
    ClienteService.prototype.obtener_ordenes_cliente = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_ordenes_cliente/' + id, { headers: headers });
    };
    ClienteService.prototype.obtener_detalles_ordenes_cliente = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_detalles_ordenes_cliente/' + id, { headers: headers });
    };
    ClienteService.prototype.emitir_review_producto_cliente = function (data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.post(this.url + 'emitir_review_producto_cliente', data, { headers: headers });
    };
    ClienteService.prototype.obtener_review_producto_cliente = function (id) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'obtener_review_producto_cliente/' + id, { headers: headers });
    };
    ClienteService.prototype.obtener_reviews_cliente = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_reviews_cliente/' + id, { headers: headers });
    };
    ClienteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ClienteService);
    return ClienteService;
}());
exports.ClienteService = ClienteService;
