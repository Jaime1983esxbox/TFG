"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InicioComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var InicioComponent = /** @class */ (function () {
    function InicioComponent(_guestService, _clienteService) {
        var _this = this;
        this._guestService = _guestService;
        this._clienteService = _clienteService;
        this.descuento_activo = undefined;
        this.new_productos = [];
        this.mas_vendidos = [];
        this.categorias = [];
        this.url = GLOBAL_1.GLOBAL.url;
        this._clienteService.obtener_config_publico().subscribe(function (response) {
            response.data.categorias.forEach(function (element) {
                if (element.titulo == 'Smartphones') {
                    _this.categorias.push({
                        titulo: element.titulo,
                        portada: 'assets/img/ecommerce/home/categories/04.jpg'
                    });
                }
                else if (element.titulo == 'Headphones') {
                    _this.categorias.push({
                        titulo: element.titulo,
                        portada: 'assets/img/ecommerce/home/categories/05.jpg'
                    });
                }
                else if (element.titulo == 'Oficina') {
                    _this.categorias.push({
                        titulo: element.titulo,
                        portada: 'assets/img/ecommerce/home/categories/07.jpg'
                    });
                }
                else if (element.titulo == 'Moda') {
                    _this.categorias.push({
                        titulo: element.titulo,
                        portada: 'assets/img/ecommerce/home/categories/09.jpg'
                    });
                }
                else if (element.titulo == 'Alimentos') {
                    _this.categorias.push({
                        titulo: element.titulo,
                        portada: 'assets/img/ecommerce/home/categories/08.jpg'
                    });
                }
                else if (element.titulo == 'Hogar') {
                    _this.categorias.push({
                        titulo: element.titulo,
                        portada: 'assets/img/ecommerce/home/categories/03.jpg'
                    });
                }
            });
            console.log(_this.categorias);
        });
    }
    InicioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._guestService.obtener_descuento_activo().subscribe(function (response) {
            if (response.data != undefined) {
                _this.descuento_activo = response.data[0];
            }
            else {
                _this.descuento_activo = undefined;
            }
        });
        this._guestService.listar_productos_nuevos_publico().subscribe(function (response) {
            _this.new_productos = response.data;
        });
        this._guestService.listar_productos_masvendidos_publico().subscribe(function (response) {
            _this.mas_vendidos = response.data;
        });
        setTimeout(function () {
            tns({
                container: '.cs-carousel-inner',
                controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
                mode: 'gallery',
                navContainer: '#pager',
                responsive: {
                    0: { controls: false },
                    991: { controls: true }
                }
            });
            tns({
                container: '.cs-carousel-inner-two',
                controls: false,
                responsive: {
                    0: {
                        gutter: 20
                    },
                    400: {
                        items: 2,
                        gutter: 20
                    },
                    520: {
                        gutter: 30
                    },
                    768: {
                        items: 3,
                        gutter: 30
                    }
                }
            });
            tns({
                container: '.cs-carousel-inner-three',
                controls: false,
                mouseDrag: !0,
                responsive: {
                    0: {
                        items: 1,
                        gutter: 20
                    },
                    420: {
                        items: 2,
                        gutter: 20
                    },
                    600: {
                        items: 3,
                        gutter: 20
                    },
                    700: {
                        items: 3,
                        gutter: 30
                    },
                    900: {
                        items: 4,
                        gutter: 30
                    },
                    1200: {
                        items: 5,
                        gutter: 30
                    },
                    1400: {
                        items: 6,
                        gutter: 30
                    }
                }
            });
            tns({
                container: '.cs-carousel-inner-four',
                nav: false,
                controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
                controlsContainer: '#custom-controls-trending',
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
            tns({
                container: '.cs-carousel-inner-five',
                controls: false,
                gutter: 30,
                responsive: {
                    0: { items: 1 },
                    380: { items: 2 },
                    550: { items: 3 },
                    750: { items: 4 },
                    1000: { items: 5 },
                    1250: { items: 6 }
                }
            });
            tns({
                container: '.cs-carousel-inner-six',
                controls: false,
                gutter: 15,
                responsive: {
                    0: { items: 2 },
                    500: { items: 3 },
                    1200: { items: 3 }
                }
            });
        }, 500);
    };
    InicioComponent = __decorate([
        core_1.Component({
            selector: 'app-inicio',
            templateUrl: './inicio.component.html',
            styleUrls: ['./inicio.component.css']
        })
    ], InicioComponent);
    return InicioComponent;
}());
exports.InicioComponent = InicioComponent;
