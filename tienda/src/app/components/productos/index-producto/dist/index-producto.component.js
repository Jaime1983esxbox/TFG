"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexProductoComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var socket_io_client_1 = require("socket.io-client");
var IndexProductoComponent = /** @class */ (function () {
    function IndexProductoComponent(_clienteService, _route, _guestService) {
        var _this = this;
        this._clienteService = _clienteService;
        this._route = _route;
        this._guestService = _guestService;
        this.config_global = {};
        this.filter_categoria = '';
        this.productos = [];
        this.filter_producto = '';
        this.filter_cat_productos = 'todos';
        this.load_data = true;
        this.page = 1;
        this.pageSize = 6;
        this.sort_by = 'Defecto';
        this.carrito_data = {
            variedad: '',
            cantidad: 1
        };
        this.btn_cart = false;
        this.socket = socket_io_client_1.io('http://localhost:4201');
        this.descuento_activo = undefined;
        this.url = GLOBAL_1.GLOBAL.url;
        this.token = localStorage.getItem('token');
        this._clienteService.obtener_config_publico().subscribe(function (response) {
            _this.config_global = response.data;
        });
        this._route.params.subscribe(function (params) {
            _this.route_categoria = params['categoria'];
            if (_this.route_categoria) {
                _this._clienteService.listar_productos_publico('').subscribe(function (response) {
                    _this.productos = response.data;
                    _this.productos = _this.productos.filter(function (item) { return item.categoria.toLowerCase() == _this.route_categoria; });
                    _this.load_data = false;
                });
            }
            else {
                _this._clienteService.listar_productos_publico('').subscribe(function (response) {
                    _this.productos = response.data;
                    _this.load_data = false;
                });
            }
        });
    }
    IndexProductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._guestService.obtener_descuento_activo().subscribe(function (response) {
            if (response.data != undefined) {
                _this.descuento_activo = response.data[0];
            }
            else {
                _this.descuento_activo = undefined;
            }
        });
    };
    IndexProductoComponent.prototype.buscar_categorias = function () {
        var _this = this;
        if (this.filter_categoria) {
            var search = new RegExp(this.filter_categoria, 'i');
            this.config_global.categorias = this.config_global.categorias.filter(function (item) { return search.test(item.titulo); });
        }
        else {
            this._clienteService.obtener_config_publico().subscribe(function (response) {
                _this.config_global = response.data;
            });
        }
    };
    IndexProductoComponent.prototype.buscar_producto = function () {
        var _this = this;
        this._clienteService.listar_productos_publico(this.filter_producto).subscribe(function (response) {
            _this.productos = response.data;
            _this.load_data = false;
        });
    };
    IndexProductoComponent.prototype.buscar_por_categoria = function () {
        var _this = this;
        if (this.filter_cat_productos == 'todos') {
            this._clienteService.listar_productos_publico(this.filter_producto).subscribe(function (response) {
                _this.productos = response.data;
                _this.load_data = false;
            });
        }
        else {
            this._clienteService.listar_productos_publico(this.filter_producto).subscribe(function (response) {
                _this.productos = response.data;
                _this.productos = _this.productos.filter(function (item) { return item.categoria == _this.filter_cat_productos; });
                _this.load_data = false;
            });
        }
    };
    IndexProductoComponent.prototype.reset_productos = function () {
        var _this = this;
        this.filter_producto = '';
        this._clienteService.listar_productos_publico('').subscribe(function (response) {
            _this.productos = response.data;
            _this.load_data = false;
        });
    };
    IndexProductoComponent.prototype.orden_por = function () {
        var _this = this;
        if (this.sort_by == 'Defecto') {
            this._clienteService.listar_productos_publico('').subscribe(function (response) {
                _this.productos = response.data;
                _this.load_data = false;
            });
        }
        else if (this.sort_by == 'Popularidad') {
            this.productos.sort(function (a, b) {
                if (a.nventas < b.nventas) {
                    return 1;
                }
                if (a.nventas > b.nventas) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.sort_by == '+-Precio') {
            this.productos.sort(function (a, b) {
                if (a.precio < b.precio) {
                    return 1;
                }
                if (a.precio > b.precio) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.sort_by == '-+Precio') {
            this.productos.sort(function (a, b) {
                if (a.precio > b.precio) {
                    return 1;
                }
                if (a.precio < b.precio) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.sort_by == 'azTitulo') {
            this.productos.sort(function (a, b) {
                if (a.titulo > b.titulo) {
                    return 1;
                }
                if (a.titulo < b.titulo) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.sort_by == 'zaTitulo') {
            this.productos.sort(function (a, b) {
                if (a.titulo < b.titulo) {
                    return 1;
                }
                if (a.titulo > b.titulo) {
                    return -1;
                }
                return 0;
            });
        }
    };
    IndexProductoComponent.prototype.agregar_producto = function (producto) {
        var _this = this;
        var data = {
            producto: producto._id,
            cliente: localStorage.getItem('_id'),
            cantidad: 1,
            variedad: producto.variedades[0].titulo
        };
        this.btn_cart = true;
        this._clienteService.agregar_carrito_cliente(data, this.token).subscribe(function (response) {
            if (response.data == undefined) {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#FF0000',
                    position: 'topCenter',
                    message: 'El producto ya está en el carrito'
                });
                _this.btn_cart = false;
            }
            else {
                console.log(response);
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    "class": 'text-success',
                    position: 'topCenter',
                    message: 'Producto agregado al carrito correctamente'
                });
                _this.socket.emit('add-carrito-add', { data: true });
                _this.btn_cart = false;
            }
        });
    };
    IndexProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-index-producto',
            templateUrl: './index-producto.component.html',
            styleUrls: ['./index-producto.component.css']
        })
    ], IndexProductoComponent);
    return IndexProductoComponent;
}());
exports.IndexProductoComponent = IndexProductoComponent;
