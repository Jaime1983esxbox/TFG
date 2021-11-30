"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexProductoComponent = void 0;
var core_1 = require("@angular/core");
var GLOBAL_1 = require("src/app/services/GLOBAL");
var exceljs_1 = require("exceljs");
var fs = require("file-saver");
var IndexProductoComponent = /** @class */ (function () {
    function IndexProductoComponent(_productoService) {
        this._productoService = _productoService;
        this.load_data = true;
        this.filtro = '';
        this.productos = [];
        this.arr_productos = [];
        this.page = 1;
        this.pageSize = 20;
        this.load_btn = false;
        this.token = localStorage.getItem('token');
        this.url = GLOBAL_1.GLOBAL.url;
    }
    IndexProductoComponent.prototype.ngOnInit = function () {
        this.init_data();
    };
    IndexProductoComponent.prototype.init_data = function () {
        var _this = this;
        this._productoService.listar_productos_filtro_admin(this.filtro, this.token).subscribe(function (response) {
            console.log(response);
            _this.productos = response.data;
            _this.productos.forEach(function (element) {
                _this.arr_productos.push({
                    titulo: element.titulo,
                    stock: element.stock,
                    precio: element.precio,
                    categoria: element.categoria,
                    nventas: element.nventas
                });
            });
            console.log(_this.arr_productos);
            _this.load_data = false;
        }, function (error) {
            console.log(error);
        });
    };
    IndexProductoComponent.prototype.filtrar = function () {
        var _this = this;
        if (this.filtro) {
            this._productoService.listar_productos_filtro_admin(this.filtro, this.token).subscribe(function (response) {
                console.log(response);
                _this.productos = response.data;
                _this.load_data = false;
            }, function (error) {
                console.log(error);
            });
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                position: 'topCenter',
                message: 'Introduzca el filtro que desee buscar'
            });
        }
    };
    IndexProductoComponent.prototype.resetear = function () {
        this.filtro = '';
        this.init_data();
    };
    IndexProductoComponent.prototype.eliminar = function (id) {
        var _this = this;
        this.load_btn = true;
        this._productoService.eliminar_producto_admin(id, this.token).subscribe(function (response) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                "class": 'text-success',
                position: 'topCenter',
                message: 'Producto eliminado correctamente'
            });
            // Para cerrar la ventana modal
            $('#delete-' + id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            _this.load_btn = false;
            // Nos vuelve a listar los clientes ya actualizados
            _this.init_data();
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
    IndexProductoComponent.prototype.download_excel = function () {
        var workbook = new exceljs_1.Workbook();
        var worksheet = workbook.addWorksheet("Reporte de productos");
        worksheet.addRow(undefined);
        for (var _i = 0, _a = this.arr_productos; _i < _a.length; _i++) {
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
            { header: 'Producto', key: 'col1', width: 30 },
            { header: 'Stock', key: 'col2', width: 15 },
            { header: 'Precio', key: 'col3', width: 15 },
            { header: 'Categoria', key: 'col4', width: 25 },
            { header: 'N° ventas', key: 'col5', width: 15 },
        ];
        workbook.xlsx.writeBuffer().then(function (data) {
            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
        });
    };
    IndexProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-index-producto',
            templateUrl: './index-producto.component.html',
            styleUrls: ['./index-producto.component.css']
        })
    ], IndexProductoComponent);
    return IndexProductoComponent;
}());
exports.IndexProductoComponent = IndexProductoComponent;
