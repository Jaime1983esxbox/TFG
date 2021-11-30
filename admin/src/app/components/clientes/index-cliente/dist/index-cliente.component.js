"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexClienteComponent = void 0;
var core_1 = require("@angular/core");
var IndexClienteComponent = /** @class */ (function () {
    function IndexClienteComponent(_clienteService, _adminService) {
        this._clienteService = _clienteService;
        this._adminService = _adminService;
        this.clientes = [];
        this.filtro_apellidos = '';
        this.filtro_email = '';
        this.page = 1;
        this.pageSize = 20;
        this.load_data = true;
        this.token = this._adminService.getToken();
        console.log(this.token);
    }
    IndexClienteComponent.prototype.ngOnInit = function () {
        this.init_data();
    };
    IndexClienteComponent.prototype.init_data = function () {
        var _this = this;
        this._clienteService.listar_clientes_filtro_admin(null, null, this.token).subscribe(function (response) {
            _this.clientes = response.data;
            _this.load_data = false;
            // setTimeout(()=>{
            // },3000)
        }, function (error) {
            console.log(error);
        });
    };
    IndexClienteComponent.prototype.filtro = function (tipo) {
        var _this = this;
        if (tipo == 'apellidos') {
            if (this.filtro_apellidos) {
                this.load_data = true;
                this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_apellidos, this.token).subscribe(function (response) {
                    _this.clientes = response.data;
                    _this.load_data = false;
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                this.init_data();
            }
        }
        else if (tipo == 'email') {
            if (this.filtro_email) {
                this.load_data = true;
                this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_email, this.token).subscribe(function (response) {
                    _this.clientes = response.data;
                    _this.load_data = false;
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                this.init_data();
            }
        }
    };
    IndexClienteComponent.prototype.eliminar = function (id) {
        var _this = this;
        this._clienteService.eliminar_cliente_admin(id, this.token).subscribe(function (response) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                "class": 'text-success',
                position: 'topCenter',
                message: 'Cliente eliminado correctamente'
            });
            // Para cerrar la ventana modal
            $('#delete-' + id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            // Nos vuelve a listar los clientes ya actualizados
            _this.init_data();
        }, function (error) {
            console.log(error);
        });
    };
    IndexClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-index-cliente',
            templateUrl: './index-cliente.component.html',
            styleUrls: ['./index-cliente.component.css']
        })
    ], IndexClienteComponent);
    return IndexClienteComponent;
}());
exports.IndexClienteComponent = IndexClienteComponent;
