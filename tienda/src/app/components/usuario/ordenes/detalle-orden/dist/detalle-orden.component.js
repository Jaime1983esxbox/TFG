"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetalleOrdenComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var DetalleOrdenComponent = /** @class */ (function () {
    function DetalleOrdenComponent(_clienteService, _route) {
        var _this = this;
        this._clienteService = _clienteService;
        this._route = _route;
        this.detalles = [];
        this.load_data = true;
        this.orden = {};
        this.totalstar = 5;
        this.review = {};
        this.url = GLOBAL_1.GLOBAL.url;
        this.token = localStorage.getItem('token');
        this._route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.init_data();
        });
    }
    DetalleOrdenComponent.prototype.ngOnInit = function () {
        this.review.estrellas = 5;
    };
    DetalleOrdenComponent.prototype.init_data = function () {
        var _this = this;
        this._clienteService.obtener_detalles_ordenes_cliente(this.id, this.token).subscribe(function (response) {
            if (response.data != undefined) {
                _this.orden = response.data;
                response.detalles.forEach(function (element) {
                    _this._clienteService.obtener_review_producto_cliente(element.producto._id).subscribe(function (response) {
                        var reseña_emitida = false;
                        response.data.forEach(function (element_) {
                            if (element_.cliente == localStorage.getItem('_id')) {
                                reseña_emitida = true;
                            }
                        });
                        element.estado = reseña_emitida;
                    });
                });
                _this.detalles = response.detalles;
                _this.load_data = false;
            }
            else {
                _this.orden = undefined;
            }
        });
    };
    DetalleOrdenComponent.prototype.onRate = function ($event) {
        this.review.estrellas = $event.newValue;
    };
    DetalleOrdenComponent.prototype.openModal = function (item) {
        this.review = {};
        this.review.producto = item.producto._id;
        this.review.cliente = item.cliente;
        this.review.venta = this.id;
    };
    DetalleOrdenComponent.prototype.emitir = function (id) {
        var _this = this;
        if (this.review.review) {
            if (this.review.estrellas && this.review.estrellas > 0) {
                this._clienteService.emitir_review_producto_cliente(this.review, this.token).subscribe(function (response) {
                    console.log(response);
                    iziToast.show({
                        title: 'SUCCESS',
                        titleColor: '#1DC74C',
                        "class": 'text-success',
                        position: 'topCenter',
                        message: 'Reseña agregada correctamente'
                    });
                    $('#review-' + id).modal('hide');
                    $('.modal-backdrop').removeClass('show');
                    _this.init_data();
                });
            }
            else {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#FF0000',
                    position: 'topCenter',
                    message: 'Tienes que seleccionar el número de estrellas'
                });
            }
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Tienes que ingresar un mensaje en la reseña'
            });
        }
    };
    DetalleOrdenComponent = __decorate([
        core_1.Component({
            selector: 'app-detalle-orden',
            templateUrl: './detalle-orden.component.html',
            styleUrls: ['./detalle-orden.component.css']
        })
    ], DetalleOrdenComponent);
    return DetalleOrdenComponent;
}());
exports.DetalleOrdenComponent = DetalleOrdenComponent;
