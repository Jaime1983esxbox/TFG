"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var socket_io_client_1 = require("socket.io-client");
var NavComponent = /** @class */ (function () {
    function NavComponent(_clienteService, _router, _guestService) {
        var _this = this;
        this._clienteService = _clienteService;
        this._router = _router;
        this._guestService = _guestService;
        this.user = undefined;
        this.user_lc = undefined;
        this.config_global = {};
        this.op_cart = false;
        this.carrito_arr = [];
        this.subtotal = 0;
        this.socket = socket_io_client_1.io('http://localhost:4201');
        this.descuento_activo = undefined;
        this.url = GLOBAL_1.GLOBAL.url;
        this.token = localStorage.getItem('token');
        this.id = localStorage.getItem('_id');
        this._clienteService.obtener_config_publico().subscribe(function (response) {
            _this.config_global = response.data;
        });
        if (this.token) {
            this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(function (response) {
                _this.user = response.data;
                localStorage.setItem('user_data', JSON.stringify(_this.user));
                if (localStorage.getItem('user_data')) {
                    var user_data = localStorage.getItem('user_data');
                    _this.user_lc = JSON.parse(user_data);
                    _this.obtener_carrito();
                }
                else {
                    _this.user_lc = undefined;
                }
            }, function (error) {
                console.log(error);
                _this.user = undefined;
            });
        }
    }
    NavComponent.prototype.obtener_carrito = function () {
        var _this = this;
        this._clienteService.obtener_carrito_cliente(this.user_lc._id, this.token).subscribe(function (response) {
            _this.carrito_arr = response.data;
            _this.calcular_carrito();
        });
    };
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socket.on('new-carrito', function (data) {
            console.log(data);
            _this.obtener_carrito();
        });
        this.socket.on('new-carrito-add', function (data) {
            console.log(data);
            _this.obtener_carrito();
        });
        this._guestService.obtener_descuento_activo().subscribe(function (response) {
            if (response.data != undefined) {
                _this.descuento_activo = response.data[0];
            }
            else {
                _this.descuento_activo = undefined;
            }
        });
    };
    NavComponent.prototype.logout = function () {
        window.location.reload(); //para refrescar la pagina
        localStorage.clear();
        this._router.navigate(['/']);
    };
    NavComponent.prototype.op_modalCart = function () {
        if (!this.op_cart) {
            this.op_cart = true;
            $('#cart').addClass('show');
        }
        else {
            this.op_cart = false;
            $('#cart').removeClass('show');
        }
    };
    NavComponent.prototype.calcular_carrito = function () {
        var _this = this;
        this.subtotal = 0;
        if (this.descuento_activo == undefined) {
            this.carrito_arr.forEach(function (element) {
                _this.subtotal = _this.subtotal + parseInt(element.producto.precio);
            });
        }
        else if (this.descuento_activo != undefined) {
            this.carrito_arr.forEach(function (element) {
                var new_precio = parseInt(element.producto.precio) - (parseInt(element.producto.precio) * _this.descuento_activo.descuento) / 100;
                _this.subtotal = _this.subtotal + new_precio;
            });
        }
    };
    NavComponent.prototype.eliminar_item = function (id) {
        var _this = this;
        this._clienteService.eliminar_carrito_cliente(id, this.token).subscribe(function (response) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                "class": 'text-success',
                position: 'topCenter',
                message: 'Producto eliminado del carrito correctamente'
            });
            _this.socket.emit('delete-carrito', { data: response.data });
            console.log(response);
        });
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.css']
        })
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
