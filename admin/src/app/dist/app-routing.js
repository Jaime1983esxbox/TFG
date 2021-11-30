"use strict";
exports.__esModule = true;
exports.routing = exports.appRoutingProviders = void 0;
var router_1 = require("@angular/router");
var inicio_component_1 = require("./components/inicio/inicio.component");
var login_component_1 = require("./components/login/login.component");
var admin_guard_1 = require("./guards/admin.guard");
var index_cliente_component_1 = require("./components/clientes/index-cliente/index-cliente.component");
var create_cliente_component_1 = require("./components/clientes/create-cliente/create-cliente.component");
var edit_cliente_component_1 = require("./components/clientes/edit-cliente/edit-cliente.component");
var create_producto_component_1 = require("./components/productos/create-producto/create-producto.component");
var index_producto_component_1 = require("./components/productos/index-producto/index-producto.component");
var update_producto_component_1 = require("./components/productos/update-producto/update-producto.component");
var inventario_producto_component_1 = require("./components/productos/inventario-producto/inventario-producto.component");
var create_cupon_component_1 = require("./components/cupones/create-cupon/create-cupon.component");
var index_cupon_component_1 = require("./components/cupones/index-cupon/index-cupon.component");
var update_cupon_component_1 = require("./components/cupones/update-cupon/update-cupon.component");
var config_component_1 = require("./components/config/config.component");
var variedad_producto_component_1 = require("./components/productos/variedad-producto/variedad-producto.component");
var galeria_producto_component_1 = require("./components/productos/galeria-producto/galeria-producto.component");
var index_descuento_component_1 = require("./components/descuento/index-descuento/index-descuento.component");
var create_descuento_component_1 = require("./components/descuento/create-descuento/create-descuento.component");
var edit_descuento_component_1 = require("./components/descuento/edit-descuento/edit-descuento.component");
var index_contacto_component_1 = require("./components/contacto/index-contacto/index-contacto.component");
var appRoute = [
    // Poner la ruta de Inicio por defecto
    { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
    { path: 'Inicio', component: inicio_component_1.InicioComponent, canActivate: [admin_guard_1.AdminGuard] },
    { path: 'panel', children: [
            { path: 'clientes', component: index_cliente_component_1.IndexClienteComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'clientes/registro', component: create_cliente_component_1.CreateClienteComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'clientes/:id', component: edit_cliente_component_1.EditClienteComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/registro', component: create_producto_component_1.CreateProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos', component: index_producto_component_1.IndexProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/:id', component: update_producto_component_1.UpdateProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/inventario/:id', component: inventario_producto_component_1.InventarioProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/variedades/:id', component: variedad_producto_component_1.VariedadProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/galeria/:id', component: galeria_producto_component_1.GaleriaProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'cupones/registro', component: create_cupon_component_1.CreateCuponComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'cupones', component: index_cupon_component_1.IndexCuponComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'cupones/:id', component: update_cupon_component_1.UpdateCuponComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'descuentos', component: index_descuento_component_1.IndexDescuentoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'descuentos/registro', component: create_descuento_component_1.CreateDescuentoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'descuentos/:id', component: edit_descuento_component_1.EditDescuentoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'configuraciones', component: config_component_1.ConfigComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'contactos', component: index_contacto_component_1.IndexContactoComponent, canActivate: [admin_guard_1.AdminGuard] },
        ] },
    { path: 'login', component: login_component_1.LoginComponent },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoute);
