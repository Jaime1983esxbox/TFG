"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GaleriaProductoComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var uuid_1 = require("uuid");
var GaleriaProductoComponent = /** @class */ (function () {
    function GaleriaProductoComponent(_route, _productoService) {
        var _this = this;
        this._route = _route;
        this._productoService = _productoService;
        this.producto = {};
        this.file = undefined;
        this.load_btn = false;
        this.load_btn_eliminar = false;
        this.token = localStorage.getItem('token');
        this.url = GLOBAL_1.GLOBAL.url;
        this._route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.init_data();
        });
    }
    GaleriaProductoComponent.prototype.init_data = function () {
        var _this = this;
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(function (response) {
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
    };
    GaleriaProductoComponent.prototype.ngOnInit = function () {
    };
    GaleriaProductoComponent.prototype.fileChangeEvent = function (event) {
        var file;
        if (event.target.files && event.target.files[0]) {
            file = event.target.files[0];
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'No hay una imagen para enviar'
            });
        }
        if (file.size <= 4000000) {
            if (file.type == 'image/png' ||
                file.type == 'image/webp' ||
                file.type == 'image/jpg' ||
                file.type == 'image/gif' ||
                file.type == 'image/jpeg') {
                this.file = file;
            }
            else {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#FF0000',
                    position: 'topCenter',
                    message: 'El archivo tiene que ser una imagen'
                });
                $('#input-img').val('');
                this.file = undefined;
            }
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'La imagen no puede superar los 4MB'
            });
            $('#input-img').val('');
            this.file = undefined;
        }
        console.log(this.file);
    };
    GaleriaProductoComponent.prototype.subir_imagen = function () {
        var _this = this;
        if (this.file != undefined) {
            var data = {
                imagen: this.file,
                _id: uuid_1.v4()
            };
            console.log(data);
            this._productoService.agregar_imagen_galeria_admin(this.id, data, this.token).subscribe(function (response) {
                _this.init_data();
                $('#input-img').val('');
            });
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Debe seleccionar una imagen para subir'
            });
        }
    };
    GaleriaProductoComponent.prototype.eliminar = function (id) {
        var _this = this;
        this.load_btn_eliminar = true;
        this._productoService.eliminar_imagen_galeria_admin(this.id, { _id: id }, this.token).subscribe(function (response) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                "class": 'text-success',
                position: 'topCenter',
                message: 'Imagen eliminada correctamente'
            });
            // Para cerrar la ventana modal
            $('#delete-' + id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            _this.load_btn_eliminar = false;
            // Nos vuelve a listar los clientes ya actualizados
            _this.init_data();
        }, function (error) {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Error en el servidor'
            });
            console.log(error);
            _this.load_btn = false;
        });
    };
    GaleriaProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-galeria-producto',
            templateUrl: './galeria-producto.component.html',
            styleUrls: ['./galeria-producto.component.css']
        })
    ], GaleriaProductoComponent);
    return GaleriaProductoComponent;
}());
exports.GaleriaProductoComponent = GaleriaProductoComponent;
