"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateProductoComponent = void 0;
var core_1 = require("@angular/core");
var CreateProductoComponent = /** @class */ (function () {
    function CreateProductoComponent(_productoService, _adminService, _router) {
        var _this = this;
        this._productoService = _productoService;
        this._adminService = _adminService;
        this._router = _router;
        this.producto = {};
        this.file = undefined;
        this.imgSelect = 'assets/img/01.jpg';
        this.config = {};
        this.load_btn = false;
        this.config_global = {};
        this.config = {
            height: 500
        };
        this.token = this._adminService.getToken();
        this._adminService.obtener_config_publico().subscribe(function (response) {
            console.log(response);
            _this.config_global = response.data;
            console.log(_this.config_global);
        });
    }
    CreateProductoComponent.prototype.ngOnInit = function () {
    };
    CreateProductoComponent.prototype.registro = function (registroForm) {
        var _this = this;
        if (registroForm.valid) {
            if (this.file == undefined) {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#FF0000',
                    position: 'topCenter',
                    message: 'Debe subir una portada para registrar'
                });
            }
            else {
                console.log(this.producto);
                console.log(this.file);
                this.load_btn = true;
                this._productoService.registro_producto_admin(this.producto, this.file, this.token).subscribe(function (response) {
                    iziToast.show({
                        title: 'SUCCESS',
                        titleColor: '#1DC74C',
                        "class": 'text-success',
                        position: 'topCenter',
                        message: 'Producto registrado correctamente'
                    });
                    _this.load_btn = false;
                    _this._router.navigate(['/panel/productos']);
                }, function (error) {
                    console.log(error);
                    _this.load_btn = false;
                });
            }
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
    CreateProductoComponent.prototype.fileChangeEvent = function (event) {
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
    CreateProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-create-producto',
            templateUrl: './create-producto.component.html',
            styleUrls: ['./create-producto.component.css']
        })
    ], CreateProductoComponent);
    return CreateProductoComponent;
}());
exports.CreateProductoComponent = CreateProductoComponent;
