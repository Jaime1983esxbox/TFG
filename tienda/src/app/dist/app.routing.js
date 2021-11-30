"use strict";
exports.__esModule = true;
exports.routing = exports.appRoutingProviders = void 0;
var router_1 = require("@angular/router");
var inicio_component_1 = require("./components/inicio/inicio.component");
var login_component_1 = require("./components/login/login.component");
var perfil_component_1 = require("./components/usuario/perfil/perfil.component");
var auth_guard_1 = require("./guards/auth.guard");
var index_producto_component_1 = require("./components/productos/index-producto/index-producto.component");
var show_producto_component_1 = require("./components/productos/show-producto/show-producto.component");
var carrito_component_1 = require("./components/carrito/carrito.component");
var direcciones_component_1 = require("./components/usuario/direcciones/direcciones.component");
var contacto_component_1 = require("./components/contacto/contacto.component");
var index_ordenes_component_1 = require("./components/usuario/ordenes/index-ordenes/index-ordenes.component");
var detalle_orden_component_1 = require("./components/usuario/ordenes/detalle-orden/detalle-orden.component");
var index_review_component_1 = require("./components/usuario/reviews/index-review/index-review.component");
var appRoute = [
    { path: '', component: inicio_component_1.InicioComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'cuenta/perfil', component: perfil_component_1.PerfilComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'cuenta/direcciones', component: direcciones_component_1.DireccionesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'cuenta/ordenes', component: index_ordenes_component_1.IndexOrdenesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'cuenta/ordenes/:id', component: detalle_orden_component_1.DetalleOrdenComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'carrito', component: carrito_component_1.CarritoComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'cuenta/reviews', component: index_review_component_1.IndexReviewComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'productos', component: index_producto_component_1.IndexProductoComponent },
    { path: 'productos/categoria/:categoria', component: index_producto_component_1.IndexProductoComponent },
    { path: 'productos/:slug', component: show_producto_component_1.ShowProductoComponent },
    { path: 'contacto', component: contacto_component_1.ContactoComponent },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoute);
