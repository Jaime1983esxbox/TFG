"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateDescuentoComponent = void 0;
var core_1 = require("@angular/core");
var CreateDescuentoComponent = /** @class */ (function () {
    function CreateDescuentoComponent(_adminService, _descuentoService, _router) {
        this._adminService = _adminService;
        this._descuentoService = _descuentoService;
        this._router = _router;
        this.descuento = {};
        this.file = undefined;
        this.imgSelect = 'assets/img/01.jpg';
        this.load_btn = false;
        this.token = this._adminService.getToken();
    }
    CreateDescuentoComponent.prototype.ngOnInit = function () {
    };
    CreateDescuentoComponent.prototype.registro = function (registroForm) {
        var _this = this;
        if (registroForm.valid) {
            if (this.file == undefined) {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#FF0000',
                    position: 'topCenter',
                    message: 'Debe subir un banner para registrar'
                });
            }
            else {
                if (this.descuento.descuento >= 1 && this.descuento.descuento <= 100) {
                    this.load_btn = true;
                    this._descuentoService.registro_descuento_admin(this.descuento, this.file, this.token).subscribe(function (response) {
                        iziToast.show({
                            title: 'SUCCESS',
                            titleColor: '#1DC74C',
                            "class": 'text-success',
                            position: 'topCenter',
                            message: 'Descuento registrado correctamente'
                        });
                        _this.load_btn = false;
                        _this._router.navigate(['/panel/descuentos']);
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
                        message: 'El descuento debe ser entre 0% y 100%'
                    });
                    this.load_btn = false;
                }
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
    CreateDescuentoComponent.prototype.fileChangeEvent = function (event) {
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
    CreateDescuentoComponent = __decorate([
        core_1.Component({
            selector: 'app-create-descuento',
            templateUrl: './create-descuento.component.html',
            styleUrls: ['./create-descuento.component.css']
        })
    ], CreateDescuentoComponent);
    return CreateDescuentoComponent;
}());
exports.CreateDescuentoComponent = CreateDescuentoComponent;
