"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CuponService = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("./GLOBAL");
var http_1 = require("@angular/common/http");
var CuponService = /** @class */ (function () {
    function CuponService(_http) {
        this._http = _http;
        this.url = GLOBAL_1.GLOBAL.url;
    }
    CuponService.prototype.registro_cupon_admin = function (data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.post(this.url + 'registro_cupon_admin', data, { headers: headers });
    };
    CuponService.prototype.listar_cupones_admin = function (filtro, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'listar_cupones_admin/' + filtro, { headers: headers });
    };
    CuponService.prototype.obtener_cupon_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_cupon_admin/' + id, { headers: headers });
    };
    CuponService.prototype.actualizar_cupon_admin = function (id, data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.put(this.url + 'actualizar_cupon_admin/' + id, data, { headers: headers });
    };
    CuponService.prototype.eliminar_cupon_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http["delete"](this.url + 'eliminar_cupon_admin/' + id, { headers: headers });
    };
    CuponService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CuponService);
    return CuponService;
}());
exports.CuponService = CuponService;
