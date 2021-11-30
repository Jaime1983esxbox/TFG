"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditClienteComponent = void 0;
var core_1 = require("@angular/core");
var EditClienteComponent = /** @class */ (function () {
    function EditClienteComponent(_route, _clienteService, _adminService, _router) {
        this._route = _route;
        this._clienteService = _clienteService;
        this._adminService = _adminService;
        this._router = _router;
        this.cliente = {};
        this.load_btn = false;
        this.load_data = true;
        this.token = this._adminService.getToken();
    }
    EditClienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this._clienteService.obtener_cliente_admin(_this.id, _this.token).subscribe(function (response) {
                console.log(response);
                if (response.data == undefined) {
                    _this.cliente = undefined;
                    _this.load_data = false;
                }
                else {
                    _this.cliente = response.data;
                    _this.load_data = false;
                }
            }, function (error) {
            });
        });
    };
    EditClienteComponent.prototype.actualizar = function (updateForm) {
        if (updateForm.valid) {
            this.load_btn = true;
            this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(function (response) {
                console.log(response);
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    "class": 'text-success',
                    position: 'topCenter',
                    message: 'Cliente actualizado correctamente'
                });
            }, function (error) {
                console.log(error);
            });
            this.load_btn = false;
            this._router.navigate(['/panel/clientes']);
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
    EditClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-cliente',
            templateUrl: './edit-cliente.component.html',
            styleUrls: ['./edit-cliente.component.css']
        })
    ], EditClienteComponent);
    return EditClienteComponent;
}());
exports.EditClienteComponent = EditClienteComponent;
