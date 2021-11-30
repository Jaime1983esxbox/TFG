"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_tinymce_1 = require("ngx-tinymce");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app-routing");
var inicio_component_1 = require("./components/inicio/inicio.component");
var sidebar_component_1 = require("./components/sidebar/sidebar.component");
var login_component_1 = require("./components/login/login.component");
var index_cliente_component_1 = require("./components/clientes/index-cliente/index-cliente.component");
var create_cliente_component_1 = require("./components/clientes/create-cliente/create-cliente.component");
var edit_cliente_component_1 = require("./components/clientes/edit-cliente/edit-cliente.component");
var create_producto_component_1 = require("./components/productos/create-producto/create-producto.component");
var index_producto_component_1 = require("./components/productos/index-producto/index-producto.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                inicio_component_1.InicioComponent,
                sidebar_component_1.SidebarComponent,
                login_component_1.LoginComponent,
                index_cliente_component_1.IndexClienteComponent,
                create_cliente_component_1.CreateClienteComponent,
                edit_cliente_component_1.EditClienteComponent,
                create_producto_component_1.CreateProductoComponent,
                index_producto_component_1.IndexProductoComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                app_routing_1.routing,
                ng_bootstrap_1.NgbPaginationModule,
                ngx_tinymce_1.NgxTinymceModule.forRoot({
                    baseURL: '../../assets/tinymce/'
                })
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
