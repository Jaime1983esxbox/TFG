"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditDescuentoComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var EditDescuentoComponent = /** @class */ (function () {
    function EditDescuentoComponent(_adminService, _descuentoService, _router, _route) {
        this._adminService = _adminService;
        this._descuentoService = _descuentoService;
        this._router = _router;
        this._route = _route;
        this.descuento = {};
        this.file = undefined;
        this.imgSelect = 'assets/img/01.jpg';
        this.load_btn = false;
        this.token = this._adminService.getToken();
        this.url = GLOBAL_1.GLOBAL.url;
    }
    EditDescuentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log(_this.id);
            _this._descuentoService.obtener_descuento_admin(_this.id, _this.token).subscribe(function (response) {
                if (response.data == undefined) {
                    _this.descuento = undefined;
                }
                else {
                    _this.descuento = response.data;
                    _this.imgSelect = _this.url + 'obtener_banner_descuento/' + _this.descuento.banner;
                }
            }, function (error) {
                console.log(error);
            });
        });
    };
    EditDescuentoComponent.prototype.actualizar = function (actualizarForm) {
        var _this = this;
        if (actualizarForm.valid) {
            if (this.descuento.descuento >= 1 && this.descuento.descuento <= 100) {
                var data = {};
                if (this.file != undefined) {
                    data.banner = this.file;
                }
                data.titulo = this.descuento.titulo;
                data.fecha_inicio = this.descuento.fecha_inicio;
                data.fecha_fin = this.descuento.fecha_fin;
                data.descuento = this.descuento.descuento;
                this.load_btn = true;
                this._descuentoService.actualizar_descuento_admin(data, this.id, this.token).subscribe(function (response) {
                    console.log(response);
                    iziToast.show({
                        title: 'SUCCESS',
                        titleColor: '#1DC74C',
                        "class": 'text-success',
                        position: 'topCenter',
                        message: 'Descuento actualizado correctamente'
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
    EditDescuentoComponent.prototype.fileChangeEvent = function (event) {
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
    EditDescuentoComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-descuento',
            templateUrl: './edit-descuento.component.html',
            styleUrls: ['./edit-descuento.component.css']
        })
    ], EditDescuentoComponent);
    return EditDescuentoComponent;
}());
exports.EditDescuentoComponent = EditDescuentoComponent;
