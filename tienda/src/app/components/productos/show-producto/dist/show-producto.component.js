"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShowProductoComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var socket_io_client_1 = require("socket.io-client");
var ShowProductoComponent = /** @class */ (function () {
    function ShowProductoComponent(_route, _guestService, _clienteService) {
        var _this = this;
        this._route = _route;
        this._guestService = _guestService;
        this._clienteService = _clienteService;
        this.producto = {};
        this.productos_rec = [];
        this.carrito_data = {
            variedad: '',
            cantidad: 1
        };
        this.btn_cart = false;
        this.socket = socket_io_client_1.io('http://localhost:4201');
        this.descuento_activo = undefined;
        this.url = GLOBAL_1.GLOBAL.url;
        this.token = localStorage.getItem('token');
        this._route.params.subscribe(function (params) {
            _this.slug = params['slug'];
            _this._guestService.obtener_productos_slug_publico(_this.slug).subscribe(function (response) {
                _this.producto = response.data;
                _this._guestService.listar_productos_recomendados_publico(_this.producto.categoria).subscribe(function (response) {
                    _this.productos_rec = response.data;
                });
            });
        });
    }
    ShowProductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            tns({
                container: '.cs-carousel-inner',
                controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
                navPosition: "top",
                controlsPosition: "top",
                mouseDrag: !0,
                speed: 600,
                autoplayHoverPause: !0,
                autoplayButtonOutput: !1,
                navContainer: "#cs-thumbnails",
                navAsThumbnails: true,
                gutter: 15
            });
            var e = document.querySelectorAll(".cs-gallery");
            if (e.length) {
                for (var t = 0; t < e.length; t++) {
                    lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
                }
            }
            tns({
                container: '.cs-carousel-inner-two',
                controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
                navPosition: "top",
                controlsPosition: "top",
                mouseDrag: !0,
                speed: 600,
                autoplayHoverPause: !0,
                autoplayButtonOutput: !1,
                nav: false,
                controlsContainer: "#custom-controls-related",
                responsive: {
                    0: {
                        items: 1,
                        gutter: 20
                    },
                    480: {
                        items: 2,
                        gutter: 24
                    },
                    700: {
                        items: 3,
                        gutter: 24
                    },
                    1100: {
                        items: 4,
                        gutter: 30
                    }
                }
            });
        }, 500);
        this._guestService.obtener_descuento_activo().subscribe(function (response) {
            if (response.data != undefined) {
                _this.descuento_activo = response.data[0];
            }
            else {
                _this.descuento_activo = undefined;
            }
        });
    };
    ShowProductoComponent.prototype.agregar_producto = function () {
        var _this = this;
        if (this.carrito_data.variedad) {
            if (this.carrito_data.cantidad <= this.producto.stock) {
                var data = {
                    producto: this.producto._id,
                    cliente: localStorage.getItem('_id'),
                    cantidad: this.carrito_data.cantidad,
                    variedad: this.carrito_data.variedad
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
            }
            else {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#FF0000',
                    position: 'topCenter',
                    message: 'La máxima cantidad disponible es: ' + this.producto.stock
                });
            }
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Seleccione una variedad de producto'
            });
        }
    };
    ShowProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-show-producto',
            templateUrl: './show-producto.component.html',
            styleUrls: ['./show-producto.component.css']
        })
    ], ShowProductoComponent);
    return ShowProductoComponent;
}());
exports.ShowProductoComponent = ShowProductoComponent;
