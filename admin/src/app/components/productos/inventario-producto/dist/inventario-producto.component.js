"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InventarioProductoComponent = void 0;
var core_1 = require("@angular/core");
var exceljs_1 = require("exceljs");
var fs = require("file-saver");
var InventarioProductoComponent = /** @class */ (function () {
    function InventarioProductoComponent(_route, _productoService) {
        this._route = _route;
        this._productoService = _productoService;
        this.producto = {};
        this.arr_inventario = [];
        this.inventarios = [];
        this.load_btn = false;
        this.inventario = [];
        this.token = localStorage.getItem('token');
        this._idUser = localStorage.getItem('_id');
        console.log(this._idUser);
    }
    InventarioProductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this._productoService.obtener_producto_admin(_this.id, _this.token).subscribe(function (response) {
                if (response.data == undefined) {
                    _this.producto = undefined;
                }
                else {
                    _this.producto = response.data;
                    _this._productoService.listar_inventario_producto_admin(_this.producto._id, _this.token).subscribe(function (response) {
                        _this.inventarios = response.data;
                        _this.inventarios.forEach(function (element) {
                            _this.arr_inventario.push({
                                admin: element.admin.nombre + ' ' + element.admin.apellidos,
                                cantidad: element.cantidad,
                                proveedor: element.proveedor
                            });
                        });
                    }, function (error) {
                    });
                }
            }, function (error) {
                console.log(error);
            });
        });
    };
    InventarioProductoComponent.prototype.eliminar = function (id) {
        var _this = this;
        this.load_btn = true;
        this._productoService.eliminar_inventario_producto_admin(id, this.token).subscribe(function (response) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                "class": 'text-success',
                position: 'topCenter',
                message: 'Stock del producto eliminado correctamente'
            });
            // Para cerrar la ventana modal
            $('#delete-' + id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            _this.load_btn = false;
            // Nos vuelve a listar los clientes ya actualizados
            _this._productoService.listar_inventario_producto_admin(_this.producto._id, _this.token).subscribe(function (response) {
                _this.inventarios = response.data;
                console.log(_this.inventarios);
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Error en el servidor'
            });
            console.log(error);
            _this.load_btn = false;
        });
    };
    InventarioProductoComponent.prototype.registro_inventario = function (inventarioForm) {
        var _this = this;
        if (inventarioForm.valid) {
            var data = {
                producto: this.producto._id,
                cantidad: inventarioForm.value.cantidad,
                admin: this._idUser,
                proveedor: inventarioForm.value.proveedor
            };
            console.log(data);
            this._productoService.registro_inventario_producto_admin(data, this.token).subscribe(function (response) {
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    "class": 'text-success',
                    position: 'topCenter',
                    message: 'Se agregó el nuevo stock al producto'
                });
                _this._productoService.listar_inventario_producto_admin(_this.producto._id, _this.token).subscribe(function (response) {
                    _this.inventarios = response.data;
                }, function (error) {
                });
            }, function (error) {
                console.log(error);
            });
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Datos del formulario incorrectos'
            });
        }
    };
    InventarioProductoComponent.prototype.download_excel = function () {
        var workbook = new exceljs_1.Workbook();
        var worksheet = workbook.addWorksheet("Reporte de productos");
        worksheet.addRow(undefined);
        for (var _i = 0, _a = this.arr_inventario; _i < _a.length; _i++) {
            var x1 = _a[_i];
            var x2 = Object.keys(x1);
            var temp = [];
            for (var _b = 0, x2_1 = x2; _b < x2_1.length; _b++) {
                var y = x2_1[_b];
                temp.push(x1[y]);
            }
            worksheet.addRow(temp);
        }
        var fname = 'REP01- ';
        worksheet.columns = [
            { header: 'Trabajador', key: 'col1', width: 30 },
            { header: 'Cantidad', key: 'col2', width: 15 },
            { header: 'Proveedor', key: 'col3', width: 25 },
        ];
        workbook.xlsx.writeBuffer().then(function (data) {
            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
        });
    };
    InventarioProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-inventario-producto',
            templateUrl: './inventario-producto.component.html',
            styleUrls: ['./inventario-producto.component.css']
        })
    ], InventarioProductoComponent);
    return InventarioProductoComponent;
}());
exports.InventarioProductoComponent = InventarioProductoComponent;
