"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateProductoComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var UpdateProductoComponent = /** @class */ (function () {
    function UpdateProductoComponent(_route, _productoService, _router, _adminService) {
        var _this = this;
        this._route = _route;
        this._productoService = _productoService;
        this._router = _router;
        this._adminService = _adminService;
        this.producto = {};
        this.config = {};
        this.load_btn = false;
        this.file = undefined;
        this.config_global = {};
        this.config = {
            height: 500
        };
        this.token = localStorage.getItem('token');
        this.url = GLOBAL_1.GLOBAL.url;
        this._adminService.obtener_config_publico().subscribe(function (response) {
            console.log(response);
            _this.config_global = response.data;
            console.log(_this.config_global);
        });
    }
    UpdateProductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log(_this.id);
            _this._productoService.obtener_producto_admin(_this.id, _this.token).subscribe(function (response) {
                if (response.data == undefined) {
                    _this.producto = undefined;
                }
                else {
                    _this.producto = response.data;
                    _this.imgSelect = _this.url + 'obtener_portada/' + _this.producto.portada;
                }
            }, function (error) {
                console.log(error);
            });
        });
    };
    UpdateProductoComponent.prototype.actualizar = function (actualizarForm) {
        var _this = this;
        if (actualizarForm.valid) {
            var data = {};
            if (this.file != undefined) {
                data.portada = this.file;
            }
            data.titulo = this.producto.titulo;
            data.stock = this.producto.stock;
            data.precio = this.producto.precio;
            data.categoria = this.producto.categoria;
            data.descripcion = this.producto.descripcion;
            data.contenido = this.producto.contenido;
            this.load_btn = true;
            this._productoService.actualizar_producto_admin(data, this.id, this.token).subscribe(function (response) {
                console.log(response);
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    "class": 'text-success',
                    position: 'topCenter',
                    message: 'Producto actualizado correctamente'
                });
                _this.load_btn = false;
                _this._router.navigate(['/panel/productos']);
            }, function (error) {
                console.log(error);
                _this.load_btn = false;
            });
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Datos incorrectos'
            });
            this.load_btn = false;
        }
    };
    UpdateProductoComponent.prototype.fileChangeEvent = function (event) {
        var _this = this;
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
            if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
                var reader_1 = new FileReader();
                reader_1.onload = function (e) { return _this.imgSelect = reader_1.result; };
                reader_1.readAsDataURL(file);
                console.log(this.imgSelect);
                $('#input-portada').text(file.name);
                this.file = file;
            }
            else {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#FF0000',
                    position: 'topCenter',
                    message: 'El archivo tiene que ser una imagen'
                });
                $('#input-portada').text('Seleccionar imagen');
                this.imgSelect = 'assets/img/01.jpg';
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
            $('#input-portada').text('Selecionar imagen');
            this.imgSelect = 'assets/img/01.jpg';
            this.file = undefined;
        }
        console.log(this.file);
    };
    UpdateProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-update-producto',
            templateUrl: './update-producto.component.html',
            styleUrls: ['./update-producto.component.css']
        })
    ], UpdateProductoComponent);
    return UpdateProductoComponent;
}());
exports.UpdateProductoComponent = UpdateProductoComponent;
