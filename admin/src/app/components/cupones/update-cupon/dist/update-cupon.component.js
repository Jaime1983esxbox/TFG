"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCuponComponent = void 0;
var core_1 = require("@angular/core");
var UpdateCuponComponent = /** @class */ (function () {
    function UpdateCuponComponent(_cuponService, _router, _route) {
        this._cuponService = _cuponService;
        this._router = _router;
        this._route = _route;
        this.cupon = {
            tipo: ''
        };
        this.load_btn = false;
        this.load_data = true;
        this.token = localStorage.getItem('token');
    }
    UpdateCuponComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log(_this.id);
            ;
            _this._cuponService.obtener_cupon_admin(_this.id, _this.token).subscribe(function (response) {
                if (response.data == undefined) {
                    _this.cupon = undefined;
                    _this.load_data = false;
                }
                else {
                    _this.cupon = response.data;
                    _this.load_data = false;
                }
                console.log(_this.cupon);
            });
        });
    };
    UpdateCuponComponent.prototype.actualizar = function (actualizarForm) {
        var _this = this;
        if (actualizarForm.valid) {
            this.load_btn = true;
            this._cuponService.actualizar_cupon_admin(this.id, this.cupon, this.token).subscribe(function (response) {
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    "class": 'text-success',
                    position: 'topCenter',
                    message: 'Cupón actualizado correctamente'
                });
                _this.load_btn = false;
                _this._router.navigate(['/panel/cupones']);
            });
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Datos incorrectos'
            });
        }
    };
    UpdateCuponComponent = __decorate([
        core_1.Component({
            selector: 'app-update-cupon',
            templateUrl: './update-cupon.component.html',
            styleUrls: ['./update-cupon.component.css']
        })
    ], UpdateCuponComponent);
    return UpdateCuponComponent;
}());
exports.UpdateCuponComponent = UpdateCuponComponent;
