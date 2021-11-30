"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CarritoComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var socket_io_client_1 = require("socket.io-client");
var CarritoComponent = /** @class */ (function () {
    function CarritoComponent(_clienteService, _guestService) {
        var _this = this;
        this._clienteService = _clienteService;
        this._guestService = _guestService;
        this.carrito_arr = [];
        this.subtotal = 0;
        this.total_pagar = 0;
        this.socket = socket_io_client_1.io('http://localhost:4201');
        this.direccion_principal = {};
        this.envios = [];
        this.precio_envio = "0";
        this.venta = {};
        this.dventa = [];
        this.card_data = {};
        this.btn_load = false;
        this.carrito_load = true;
        this.user = {};
        this.descuento = 0;
        this.error_cupon = '';
        this.descuento_activo = undefined;
        this.idCliente = localStorage.getItem('_id');
        this.venta.cliente = this.idCliente;
        this.token = localStorage.getItem('token');
        this.url = GLOBAL_1.GLOBAL.url;
        this._guestService.get_envios().subscribe(function (response) {
            _this.envios = response;
        });
        var user_data = localStorage.getItem('user_data');
        this.user = JSON.parse(user_data);
    }
    CarritoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._guestService.obtener_descuento_activo().subscribe(function (response) {
            if (response.data != undefined) {
                _this.descuento_activo = response.data[0];
            }
            else {
                _this.descuento_activo = undefined;
            }
        });
        this.init_data();
        setTimeout(function () {
            new Cleave('#cc-number', {
                creditCard: true,
                onCreditCardTypeChanged: function (type) {
                }
            }),
                new Cleave('#cc-exp-date', {
                    date: true,
                    datePattern: ['m', 'Y']
                });
            new Cleave('#cc-cvc', {
                numericOnly: true
            });
            var sidebar = new StickySidebar('.sidebar-sticky', { topSpacing: 20 });
        });
        this.get_direccion_principal();
        paypal.Buttons({
            style: {
                layout: 'horizontal'
            },
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                            description: 'Nombre del pago',
                            amount: {
                                currency_code: 'USD',
                                value: 999
                            }
                        }]
                });
            },
            onApprove: function (data, actions) { return __awaiter(_this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, actions.order.capture()];
                        case 1:
                            order = _a.sent();
                            console.log(order);
                            this.venta.transaccion = order.purchase_units[0].payments.captures[0].id;
                            console.log(this.dventa);
                            this.venta.detalles = this.dventa;
                            this._clienteService.registro_compra_cliente(this.venta, this.token).subscribe(function (response) {
                                console.log(response);
                            });
                            return [2 /*return*/];
                    }
                });
            }); },
            onError: function (err) {
            },
            onCancel: function (data, actions) {
            }
        }).render(this.paypalElement.nativeElement);
    };
    CarritoComponent.prototype.init_data = function () {
        var _this = this;
        this._clienteService.obtener_carrito_cliente(this.idCliente, this.token).subscribe(function (response) {
            _this.carrito_arr = response.data;
            _this.carrito_arr.forEach(function (element) {
                _this.dventa.push({
                    producto: element.producto._id,
                    subtotal: element.producto.precio,
                    variedad: element.variedad,
                    cantidad: element.cantidad,
                    cliente: localStorage.getItem('_id')
                });
            });
            setTimeout(function () {
                _this.carrito_load = false;
            }, 500);
            _this.calcular_carrito();
            _this.calcular_total('Envío gratuito');
        });
    };
    CarritoComponent.prototype.calcular_carrito = function () {
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
    CarritoComponent.prototype.eliminar_item = function (id) {
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
            _this.init_data();
        });
    };
    CarritoComponent.prototype.get_direccion_principal = function () {
        var _this = this;
        this._clienteService.obtener_direccion_principal_cliente(localStorage.getItem('_id'), this.token).subscribe(function (response) {
            if (response.data == undefined) {
                _this.direccion_principal = undefined;
            }
            else {
                _this.direccion_principal = response.data;
                _this.venta.direccion = _this.direccion_principal._id;
                _this.calcular_total('Envío gratuito');
            }
        });
    };
    CarritoComponent.prototype.calcular_total = function (envio_titulo) {
        this.total_pagar = parseInt(this.subtotal.toString()) + parseInt(this.precio_envio);
        this.venta.subtotal = this.total_pagar;
        this.venta.envio_precio = parseInt(this.precio_envio);
        this.venta.envio_titulo = envio_titulo;
        console.log(this.venta);
    };
    __decorate([
        core_1.ViewChild('paypalButton', { static: true })
    ], CarritoComponent.prototype, "paypalElement");
    CarritoComponent = __decorate([
        core_1.Component({
            selector: 'app-carrito',
            templateUrl: './carrito.component.html',
            styleUrls: ['./carrito.component.css']
        })
    ], CarritoComponent);
    return CarritoComponent;
}());
exports.CarritoComponent = CarritoComponent;
