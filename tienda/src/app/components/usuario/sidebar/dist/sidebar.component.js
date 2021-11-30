"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(_clienteService, _router) {
        var _this = this;
        this._clienteService = _clienteService;
        this._router = _router;
        this.user = undefined;
        this.user_lc = undefined;
        this.token = localStorage.getItem('token');
        this.id = localStorage.getItem('_id');
        if (this.token) {
            this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(function (response) {
                _this.user = response.data;
                localStorage.setItem('user_data', JSON.stringify(_this.user));
                if (localStorage.getItem('user_data')) {
                    var user_data = localStorage.getItem('user_data');
                    _this.user_lc = JSON.parse(user_data);
                }
                else {
                    _this.user_lc = undefined;
                }
            }, function (error) {
                console.log(error);
                _this.user = undefined;
            });
        }
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent.prototype.logout = function () {
        window.location.reload(); //para refrescar la pagina
        localStorage.clear();
        this._router.navigate(['/']);
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.css']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
