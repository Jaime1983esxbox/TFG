"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexDescuentoComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var IndexDescuentoComponent = /** @class */ (function () {
    function IndexDescuentoComponent(_descuentoService) {
        this._descuentoService = _descuentoService;
        this.load_data = true;
        this.filtro = '';
        this.descuentos = [];
        this.page = 1;
        this.pageSize = 20;
        this.load_btn = false;
        this.token = localStorage.getItem('token');
        this.url = GLOBAL_1.GLOBAL.url;
    }
    IndexDescuentoComponent.prototype.ngOnInit = function () {
        this.init_data();
    };
    IndexDescuentoComponent.prototype.init_data = function () {
        var _this = this;
        this._descuentoService.listar_descuentos_admin(this.filtro, this.token).subscribe(function (response) {
            console.log(response);
            _this.descuentos = response.data;
            _this.descuentos.forEach(function (element) {
                var tt_inicio = Date.parse(element.fecha_inicio + 'T00:00:00') / 1000;
                var tt_fin = Date.parse(element.fecha_fin + 'T00:00:00') / 1000;
                var today = Date.parse(new Date().toString()) / 1000;
                if (today >= tt_inicio) {
                    element.estado = 'Caducado';
                }
                if (today < tt_inicio) {
                    element.estado = 'Próximamente';
                }
                if (today >= tt_inicio && today <= tt_fin) {
                    element.estado = 'En progreso';
                }
            });
            _this.load_data = false;
        }, function (error) {
            console.log(error);
        });
    };
    IndexDescuentoComponent.prototype.filtrar = function () {
        var _this = this;
        if (this.filtro) {
            this._descuentoService.listar_descuentos_admin(this.filtro, this.token).subscribe(function (response) {
                console.log(response);
                _this.descuentos = response.data;
                _this.load_data = false;
            }, function (error) {
                console.log(error);
            });
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Introduzca el filtro que desee buscar'
            });
        }
    };
    IndexDescuentoComponent.prototype.resetear = function () {
        this.filtro = '';
        this.init_data();
    };
    IndexDescuentoComponent.prototype.eliminar = function (id) {
        var _this = this;
        this.load_btn = true;
        this._descuentoService.eliminar_descuento_admin(id, this.token).subscribe(function (response) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                "class": 'text-success',
                position: 'topCenter',
                message: 'Producto eliminado correctamente'
            });
            // Para cerrar la ventana modal
            $('#delete-' + id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            _this.load_btn = false;
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
    IndexDescuentoComponent = __decorate([
        core_1.Component({
            selector: 'app-index-descuento',
            templateUrl: './index-descuento.component.html',
            styleUrls: ['./index-descuento.component.css']
        })
    ], IndexDescuentoComponent);
    return IndexDescuentoComponent;
}());
exports.IndexDescuentoComponent = IndexDescuentoComponent;
