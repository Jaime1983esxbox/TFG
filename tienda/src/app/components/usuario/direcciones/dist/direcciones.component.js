"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DireccionesComponent = void 0;
var core_1 = require("@angular/core");
var DireccionesComponent = /** @class */ (function () {
    function DireccionesComponent(_guestService, _clienteService) {
        var _this = this;
        this._guestService = _guestService;
        this._clienteService = _clienteService;
        this.direccion = {
            pais: '',
            comunidad_autonoma: '',
            provincia: '',
            ciudad: '',
            principal: false
        };
        this.ciudades = [];
        this.provincias = [];
        this.comunidades_autonomas = [];
        this.ciudades_arr = [];
        this.provincias_arr = [];
        this.comunidades_autonomas_arr = [];
        this.direcciones = [];
        this.load_data = true;
        this.token = localStorage.getItem('token');
        this._guestService.get_comunidades_autonomas().subscribe(function (response) {
            response.forEach(function (element) {
                _this.comunidades_autonomas.push({
                    id: element.id,
                    name: element.name
                });
            });
        });
        this._guestService.get_comunidades_autonomas().subscribe(function (response) {
            _this.comunidades_autonomas_arr = response;
        });
        this._guestService.get_provincias().subscribe(function (response) {
            _this.provincias_arr = response;
        });
        this._guestService.get_ciudades().subscribe(function (response) {
            _this.ciudades_arr = response;
        });
    }
    DireccionesComponent.prototype.ngOnInit = function () {
        this.obtener_direccion();
    };
    DireccionesComponent.prototype.select_comunidad_autonoma = function () {
        var _this = this;
        this.provincias = [];
        $('#sl-provincia').prop('disabled', false);
        $('#sl-ciudad').prop('disabled', true);
        this.direccion.provincia = '';
        this.direccion.ciudad = '';
        this._guestService.get_provincias().subscribe(function (response) {
            response.forEach(function (element) {
                if (element.comunity_id == _this.direccion.comunidad_autonoma) {
                    _this.provincias.push({
                        id: element.id,
                        name: element.name
                    });
                }
            });
        });
    };
    DireccionesComponent.prototype.select_provincia = function () {
        var _this = this;
        this.ciudades = [];
        $('#sl-ciudad').prop('disabled', false);
        this.direccion.ciudad = '';
        this._guestService.get_ciudades().subscribe(function (response) {
            response.forEach(function (element) {
                if (element.province_id == _this.direccion.provincia) {
                    _this.ciudades.push({
                        id: element.id,
                        name: element.name
                    });
                }
            });
        });
    };
    DireccionesComponent.prototype.registrar = function (registroForm) {
        var _this = this;
        if (registroForm.valid) {
            // Para pintar el nombre del país, comunidades, provincias y ciudades
            this.direccion.pais = 'España';
            this.comunidades_autonomas_arr.forEach(function (element) {
                if (parseInt(element.id) == parseInt(_this.direccion.comunidad_autonoma)) {
                    _this.direccion.comunidad_autonoma = element.name;
                }
            });
            this.provincias_arr.forEach(function (element) {
                if (parseInt(element.id) == parseInt(_this.direccion.provincia)) {
                    _this.direccion.provincia = element.name;
                }
            });
            this.ciudades_arr.forEach(function (element) {
                if (parseInt(element.id) == parseInt(_this.direccion.ciudad)) {
                    _this.direccion.ciudad = element.name;
                }
            });
            var data = {
                destinatario: this.direccion.destinatario,
                dni: this.direccion.dni,
                cip: this.direccion.cip,
                direccion: this.direccion.direccion,
                telefono: this.direccion.telefono,
                pais: this.direccion.pais,
                comunidad_autonoma: this.direccion.comunidad_autonoma,
                provincia: this.direccion.provincia,
                ciudad: this.direccion.ciudad,
                principal: this.direccion.principal,
                cliente: localStorage.getItem('_id')
            };
            this._clienteService.registro_direccion_cliente(data, this.token).subscribe(function (response) {
                _this.direccion = {
                    pais: '',
                    comunidad_autonoma: '',
                    provincia: '',
                    ciudad: '',
                    principal: false
                };
                $('sl-comunidad_autonoma').prop('disabled', true);
                $('sl-provincia').prop('disabled', true);
                $('sl-ciudad').prop('disabled', true);
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    "class": 'text-success',
                    position: 'topCenter',
                    message: 'Nueva dirección agregada correctamente'
                });
            });
            this.obtener_direccion();
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
    DireccionesComponent.prototype.obtener_direccion = function () {
        var _this = this;
        this._clienteService.obtener_direccion_todos_cliente(localStorage.getItem('_id'), this.token).subscribe(function (response) {
            _this.direcciones = response.data;
            _this.load_data = false;
        });
    };
    DireccionesComponent.prototype.establecer_principal = function (id) {
        var _this = this;
        this._clienteService.cambiar_direccion_principal_cliente(id, localStorage.getItem('_id'), this.token).subscribe(function (response) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                "class": 'text-success',
                position: 'topCenter',
                message: 'Dirección principal actualizada correctamente'
            });
            _this.obtener_direccion();
        });
    };
    DireccionesComponent = __decorate([
        core_1.Component({
            selector: 'app-direcciones',
            templateUrl: './direcciones.component.html',
            styleUrls: ['./direcciones.component.css']
        })
    ], DireccionesComponent);
    return DireccionesComponent;
}());
exports.DireccionesComponent = DireccionesComponent;
