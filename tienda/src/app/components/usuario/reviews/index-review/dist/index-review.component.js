"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexReviewComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var IndexReviewComponent = /** @class */ (function () {
    function IndexReviewComponent(_clienteService) {
        this._clienteService = _clienteService;
        this.load_data = true;
        this.reviews = [];
        this.page = 1;
        this.pageSize = 6;
        this.token = localStorage.getItem('token');
        this.url = GLOBAL_1.GLOBAL.url;
    }
    IndexReviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._clienteService.obtener_reviews_cliente(localStorage.getItem('_id'), this.token).subscribe(function (response) {
            console.log(response);
            _this.reviews = response.data;
            _this.load_data = false;
        });
    };
    IndexReviewComponent = __decorate([
        core_1.Component({
            selector: 'app-index-review',
            templateUrl: './index-review.component.html',
            styleUrls: ['./index-review.component.css']
        })
    ], IndexReviewComponent);
    return IndexReviewComponent;
}());
exports.IndexReviewComponent = IndexReviewComponent;
