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
var ClienteService = /** @class */ (function () {
    function ClienteService(_http) {
        this._http = _http;
        this.url = GLOBAL_1.GLOBAL.url;
    }
    ClienteService.prototype.listar_clientes_filtro_admin = function (tipo, filtro, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'listar_clientes_filtro_admin/' + tipo + '/' + filtro, { headers: headers });
    };
    ClienteService.prototype.registro_cliente_admin = function (data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.post(this.url + 'registro_cliente_admin/', data, { headers: headers });
    };
    ClienteService.prototype.obtener_cliente_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_cliente_admin/' + id, { headers: headers });
    };
    ClienteService.prototype.actualizar_cliente_admin = function (id, data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.put(this.url + 'actualizar_cliente_admin/' + id, data, { headers: headers });
    };
    ClienteService.prototype.eliminar_cliente_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http["delete"](this.url + 'eliminar_cliente_admin/' + id, { headers: headers });
    };
    ClienteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ClienteService);
    return ClienteService;
}());
exports.ClienteService = ClienteService;
