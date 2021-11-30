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
var app_routing_1 = require("./app.routing");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var inicio_component_1 = require("./components/inicio/inicio.component");
var nav_component_1 = require("./components/nav/nav.component");
var footer_component_1 = require("./components/footer/footer.component");
var login_component_1 = require("./components/login/login.component");
var perfil_component_1 = require("./components/usuario/perfil/perfil.component");
var sidebar_component_1 = require("./components/usuario/sidebar/sidebar.component");
var index_producto_component_1 = require("./components/productos/index-producto/index-producto.component");
var show_producto_component_1 = require("./components/productos/show-producto/show-producto.component");
var carrito_component_1 = require("./components/carrito/carrito.component");
var direcciones_component_1 = require("./components/usuario/direcciones/direcciones.component");
var descuento_pipe_1 = require("./pipes/descuento.pipe");
var contacto_component_1 = require("./components/contacto/contacto.component");
var index_ordenes_component_1 = require("./components/usuario/ordenes/index-ordenes/index-ordenes.component");
var detalle_orden_component_1 = require("./components/usuario/ordenes/detalle-orden/detalle-orden.component");
var ng_starrating_1 = require("ng-starrating");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                inicio_component_1.InicioComponent,
                nav_component_1.NavComponent,
                footer_component_1.FooterComponent,
                login_component_1.LoginComponent,
                perfil_component_1.PerfilComponent,
                sidebar_component_1.SidebarComponent,
                index_producto_component_1.IndexProductoComponent,
                show_producto_component_1.ShowProductoComponent,
                carrito_component_1.CarritoComponent,
                direcciones_component_1.DireccionesComponent,
                descuento_pipe_1.DescuentoPipe,
                contacto_component_1.ContactoComponent,
                index_ordenes_component_1.IndexOrdenesComponent,
                detalle_orden_component_1.DetalleOrdenComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                app_routing_1.routing,
                ng_bootstrap_1.NgbPaginationModule,
                ng_starrating_1.RatingModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
