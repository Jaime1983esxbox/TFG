"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexCuponComponent = void 0;
var core_1 = require("@angular/core");
var IndexCuponComponent = /** @class */ (function () {
    function IndexCuponComponent(_cuponService) {
        this._cuponService = _cuponService;
        this.load_data = true;
        this.page = 1;
        this.pageSize = 20;
        this.cupones = [];
        this.filtro = '';
        this.token = localStorage.getItem('token');
    }
    IndexCuponComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(function (response) {
            _this.cupones = response.data;
            _this.load_data = false;
        });
    };
    IndexCuponComponent.prototype.filtrar = function () {
        var _this = this;
        this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(function (response) {
            _this.cupones = response.data;
            _this.load_data = false;
        });
    };
    IndexCuponComponent.prototype.eliminar = function (id) {
        var _this = this;
        this._cuponService.eliminar_cupon_admin(id, this.token).subscribe(function (response) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                "class": 'text-success',
                position: 'topCenter',
                message: 'Cupón eliminado correctamente'
            });
            // Para cerrar la ventana modal
            $('#delete-' + id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            // Nos vuelve a listar los clientes ya actualizados
            _this._cuponService.listar_cupones_admin(_this.filtro, _this.token).subscribe(function (response) {
                _this.cupones = response.data;
                _this.load_data = false;
            });
        }, function (error) {
            console.log(error);
        });
    };
    IndexCuponComponent = __decorate([
        core_1.Component({
            selector: 'app-index-cupon',
            templateUrl: './index-cupon.component.html',
            styleUrls: ['./index-cupon.component.css']
        })
    ], IndexCuponComponent);
    return IndexCuponComponent;
}());
exports.IndexCuponComponent = IndexCuponComponent;
