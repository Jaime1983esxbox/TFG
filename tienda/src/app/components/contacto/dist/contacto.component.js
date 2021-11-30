"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactoComponent = void 0;
var core_1 = require("@angular/core");
var ContactoComponent = /** @class */ (function () {
    function ContactoComponent(_guestService) {
        this._guestService = _guestService;
        this.contacto = {};
        this.load_btn = false;
    }
    ContactoComponent.prototype.ngOnInit = function () {
    };
    ContactoComponent.prototype.registro = function (registroForm) {
        var _this = this;
        if (registroForm.valid) {
            this.load_btn = true;
            this._guestService.enviar_mensaje_contacto(this.contacto).subscribe(function (response) {
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    "class": 'text-success',
                    position: 'topCenter',
                    message: 'Mensaje enviado correctamente'
                });
                _this.contacto = {};
                _this.load_btn = false;
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
    ContactoComponent = __decorate([
        core_1.Component({
            selector: 'app-contacto',
            templateUrl: './contacto.component.html',
            styleUrls: ['./contacto.component.css']
        })
    ], ContactoComponent);
    return ContactoComponent;
}());
exports.ContactoComponent = ContactoComponent;
