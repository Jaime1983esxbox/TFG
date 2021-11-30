"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexOrdenesComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var IndexOrdenesComponent = /** @class */ (function () {
    function IndexOrdenesComponent(_clienteService) {
        this._clienteService = _clienteService;
        this.ordenes = [];
        this.load_data = true;
        this.page = 1;
        this.pageSize = 6;
        this.url = GLOBAL_1.GLOBAL.url;
        this.token = localStorage.getItem('token');
    }
    IndexOrdenesComponent.prototype.ngOnInit = function () {
        this.init_data();
    };
    IndexOrdenesComponent.prototype.init_data = function () {
        var _this = this;
        this._clienteService.obtener_ordenes_cliente(localStorage.getItem('_id'), this.token).subscribe(function (response) {
            _this.ordenes = response.data;
            _this.load_data = false;
        });
    };
    IndexOrdenesComponent = __decorate([
        core_1.Component({
            selector: 'app-index-ordenes',
            templateUrl: './index-ordenes.component.html',
            styleUrls: ['./index-ordenes.component.css']
        })
    ], IndexOrdenesComponent);
    return IndexOrdenesComponent;
}());
exports.IndexOrdenesComponent = IndexOrdenesComponent;
