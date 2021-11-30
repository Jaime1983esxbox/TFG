"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VariedadProductoComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var VariedadProductoComponent = /** @class */ (function () {
    function VariedadProductoComponent(_route, _productoService) {
        var _this = this;
        this._route = _route;
        this._productoService = _productoService;
        this.producto = {};
        this.nueva_variedad = '';
        this.load_btn = false;
        this.token = localStorage.getItem('token');
        this.url = GLOBAL_1.GLOBAL.url;
        this._route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this._productoService.obtener_producto_admin(_this.id, _this.token).subscribe(function (response) {
                if (response.data == undefined) {
                    _this.producto = undefined;
                }
                else {
                    _this.producto = response.data;
                }
                console.log(_this.producto);
            }, function (error) {
                console.log(error);
            });
        });
    }
    VariedadProductoComponent.prototype.ngOnInit = function () {
    };
    VariedadProductoComponent.prototype.agregar_variedad = function () {
        if (this.nueva_variedad) {
            this.producto.variedades.push({ titulo: this.nueva_variedad });
            this.nueva_variedad = '';
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'El campo de la variedad debe ser rellenado'
            });
        }
    };
    VariedadProductoComponent.prototype.eliminar_variedad = function (idx) {
        this.producto.variedades.splice(idx, 1);
    };
    VariedadProductoComponent.prototype.actualizar = function () {
        var _this = this;
        if (this.producto.titulo_variedad) {
            if (this.producto.variedades.length >= 1) {
                this.load_btn = true;
                this._productoService.actualizar_producto_variedades_admin({
                    titulo_variedad: this.producto.titulo_variedad,
                    variedades: this.producto.variedades
                }, this.id, this.token).subscribe(function (response) {
                    console.log(response);
                    iziToast.show({
                        title: 'SUCCESS',
                        titleColor: '#1DC74C',
                        "class": 'text-success',
                        position: 'topCenter',
                        message: 'Variedades actualizadas correctamente'
                    });
                    _this.load_btn = false;
                });
            }
            else {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#FF0000',
                    position: 'topCenter',
                    message: 'Se debe agregar, al menos, un título de variedad'
                });
            }
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Debe completar el título de la variedad'
            });
        }
    };
    VariedadProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-variedad-producto',
            templateUrl: './variedad-producto.component.html',
            styleUrls: ['./variedad-producto.component.css']
        })
    ], VariedadProductoComponent);
    return VariedadProductoComponent;
}());
exports.VariedadProductoComponent = VariedadProductoComponent;
