"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductoService = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("./GLOBAL");
var http_1 = require("@angular/common/http");
var ProductoService = /** @class */ (function () {
    function ProductoService(_http) {
        this._http = _http;
        this.url = GLOBAL_1.GLOBAL.url;
    }
    ProductoService.prototype.registro_producto_admin = function (data, file, token) {
        var headers = new http_1.HttpHeaders({ 'authorization': token });
        var fd = new FormData();
        fd.append('titulo', data.titulo);
        fd.append('stock', data.stock);
        fd.append('precio', data.precio);
        fd.append('descripcion', data.descripcion);
        fd.append('contenido', data.contenido);
        fd.append('categoria', data.categoria);
        fd.append('portada', file);
        return this._http.post(this.url + 'registro_producto_admin/', fd, { headers: headers });
    };
    ProductoService.prototype.listar_productos_filtro_admin = function (filtro, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'listar_productos_admin/' + filtro, { headers: headers });
    };
    ProductoService.prototype.obtener_producto_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'obtener_producto_admin/' + id, { headers: headers });
    };
    ProductoService.prototype.actualizar_producto_admin = function (data, id, token) {
        if (data.portada) {
            var headers = new http_1.HttpHeaders({ 'authorization': token });
            var fd = new FormData();
            fd.append('titulo', data.titulo);
            fd.append('stock', data.stock);
            fd.append('precio', data.precio);
            fd.append('descripcion', data.descripcion);
            fd.append('contenido', data.contenido);
            fd.append('categoria', data.categoria);
            fd.append('portada', data.portada);
            return this._http.put(this.url + 'actualizar_producto_admin/' + id, fd, { headers: headers });
        }
        else {
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
            return this._http.put(this.url + 'actualizar_producto_admin/' + id, data, { headers: headers });
        }
    };
    ProductoService.prototype.eliminar_producto_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http["delete"](this.url + 'eliminar_producto_admin/' + id, { headers: headers });
    };
    ProductoService.prototype.listar_inventario_producto_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.get(this.url + 'listar_inventario_producto_admin/' + id, { headers: headers });
    };
    ProductoService.prototype.eliminar_inventario_producto_admin = function (id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http["delete"](this.url + 'eliminar_inventario_producto_admin/' + id, { headers: headers });
    };
    ProductoService.prototype.registro_inventario_producto_admin = function (data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.post(this.url + 'registro_inventario_producto_admin/', data, { headers: headers });
    };
    ProductoService.prototype.actualizar_producto_variedades_admin = function (data, id, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.put(this.url + 'actualizar_producto_variedades_admin/' + id, data, { headers: headers });
    };
    ProductoService.prototype.agregar_imagen_galeria_admin = function (id, data, token) {
        var headers = new http_1.HttpHeaders({ 'authorization': token });
        var fd = new FormData();
        fd.append('_id', data._id);
        fd.append('imagen', data.imagen);
        return this._http.put(this.url + 'agregar_imagen_galeria_admin/' + id, fd, { headers: headers });
    };
    ProductoService.prototype.eliminar_imagen_galeria_admin = function (id, data, token) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        return this._http.put(this.url + 'eliminar_imagen_galeria_admin/' + id, data, { headers: headers });
    };
    ProductoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductoService);
    return ProductoService;
}());
exports.ProductoService = ProductoService;
