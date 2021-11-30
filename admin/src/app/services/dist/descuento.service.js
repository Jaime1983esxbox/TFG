"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DescuentoService = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("./GLOBAL");
var http_1 = require("@angular/common/http");
var DescuentoService = /** @class */ (function () {
    function DescuentoService(_http) {
        this._http = _http;
        this.url = GLOBAL_1.GLOBAL.url;
    }
    DescuentoService.prototype.listar_descuentos_admin = function (filtro, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'listar_descuentos_admin/' + filtro, { headers: headers });
    };
    DescuentoService.prototype.eliminar_descuento_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http["delete"](this.url + 'eliminar_descuento_admin/' + id, { headers: headers });
    };
    DescuentoService.prototype.registro_descuento_admin = function (data, file, token) {
        var headers = new http_1.HttpHeaders({ 'authorization': token });
        var fd = new FormData();
        fd.append('titulo', data.titulo);
        fd.append('descuento', data.descuento.toString());
        fd.append('fecha_inicio', data.fecha_inicio);
        fd.append('fecha_fin', data.fecha_fin);
        fd.append('banner', file);
        return this._http.post(this.url + 'registro_descuento_admin/', fd, { headers: headers });
    };
    DescuentoService.prototype.obtener_descuento_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_descuento_admin/' + id, { headers: headers });
    };
    DescuentoService.prototype.actualizar_descuento_admin = function (data, id, token) {
        if (data.banner) {
            var headers = new http_1.HttpHeaders({ 'authorization': token });
            var fd = new FormData();
            fd.append('titulo', data.titulo);
            fd.append('fecha_inicio', data.fecha_inicio);
            fd.append('fecha_fin', data.fecha_fin);
            fd.append('descuento', data.descuento);
            fd.append('banner', data.banner);
            return this._http.put(this.url + 'actualizar_descuento_admin/' + id, fd, { headers: headers });
        }
        else {
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
            return this._http.put(this.url + 'actualizar_descuento_admin/' + id, data, { headers: headers });
        }
    };
    DescuentoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DescuentoService);
    return DescuentoService;
}());
exports.DescuentoService = DescuentoService;
