"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GuestService = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("./GLOBAL");
var http_1 = require("@angular/common/http");
var GuestService = /** @class */ (function () {
    function GuestService(_http) {
        this._http = _http;
        this.url = GLOBAL_1.GLOBAL.url;
    }
    GuestService.prototype.obtener_productos_slug_publico = function (slug) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'obtener_productos_slug_publico/' + slug, { headers: headers });
    };
    GuestService.prototype.listar_productos_recomendados_publico = function (categoria) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'listar_productos_recomendados_publico/' + categoria, { headers: headers });
    };
    GuestService.prototype.get_ciudades = function () {
        return this._http.get('./assets/ciudades.json');
    };
    GuestService.prototype.get_provincias = function () {
        return this._http.get('./assets/provincias.json');
    };
    GuestService.prototype.get_comunidades_autonomas = function () {
        return this._http.get('./assets/comunidades_autonomas.json');
    };
    GuestService.prototype.get_envios = function () {
        return this._http.get('./assets/envios.json');
    };
    GuestService.prototype.obtener_descuento_activo = function () {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'obtener_descuento_activo', { headers: headers });
    };
    GuestService.prototype.listar_productos_nuevos_publico = function () {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'listar_productos_nuevos_publico', { headers: headers });
    };
    GuestService.prototype.listar_productos_masvendidos_publico = function () {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'listar_productos_masvendidos_publico', { headers: headers });
    };
    GuestService.prototype.enviar_mensaje_contacto = function (data) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'enviar_mensaje_contacto/', data, { headers: headers });
    };
    GuestService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GuestService);
    return GuestService;
}());
exports.GuestService = GuestService;
