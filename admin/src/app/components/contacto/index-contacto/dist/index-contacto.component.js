"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexContactoComponent = void 0;
var core_1 = require("@angular/core");
var IndexContactoComponent = /** @class */ (function () {
    function IndexContactoComponent(_adminService) {
        this._adminService = _adminService;
        this.load_data = true;
        this.page = 1;
        this.pageSize = 20;
        this.mensajes = [];
        this.filtro = '';
        this.load_btn = false;
        this.token = localStorage.getItem('token');
        this.load_data = false;
    }
    IndexContactoComponent.prototype.ngOnInit = function () {
        this.init_data();
    };
    IndexContactoComponent.prototype.init_data = function () {
        var _this = this;
        this._adminService.obtener_mensajes_admin(this.token).subscribe(function (response) {
            _this.mensajes = response.data;
            _this.load_data = false;
        });
    };
    IndexContactoComponent.prototype.cerrar = function (id) {
        var _this = this;
        this.load_btn = true;
        this._adminService.cerrar_mensaje_admin(id, { data: undefined }, this.token).subscribe(function (response) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                "class": 'text-success',
                position: 'topCenter',
                message: 'Mensaje cerrado correctamente'
            });
            $('#estadoModal-' + id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            _this.init_data();
            _this.load_btn = false;
        }, function (error) {
            console.log(error);
        });
    };
    IndexContactoComponent = __decorate([
        core_1.Component({
            selector: 'app-index-contacto',
            templateUrl: './index-contacto.component.html',
            styleUrls: ['./index-contacto.component.css']
        })
    ], IndexContactoComponent);
    return IndexContactoComponent;
}());
exports.IndexContactoComponent = IndexContactoComponent;
