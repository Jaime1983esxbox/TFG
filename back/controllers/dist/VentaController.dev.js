'use strict';

var Venta = require('../models/venta');

var Dventa = require('../models/dventa');

var Producto = require('../models/producto');

var Carrito = require('../models/carrito');

var registro_compra_cliente = function registro_compra_cliente(req, res) {
  var data, detalles, venta_last, serie, correlativo, n_venta, last_nventa, arr_nventa, new_correlativo, new_serie, venta;
  return regeneratorRuntime.async(function registro_compra_cliente$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.user) {
            _context2.next = 17;
            break;
          }

          data = req.body;
          detalles = data.detalles;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Venta.find().sort({
            createdAt: -1
          }));

        case 5:
          venta_last = _context2.sent;

          if (venta_last.length == 0) {
            serie = '001';
            correlativo = '000001';
            n_venta = serie + '-' + correlativo;
          } else {
            last_nventa = venta_last[0].nventa;
            arr_nventa = last_nventa.split('-');

            if (arr_nventa[1] != '999999') {
              new_correlativo = zfill(parseInt(arr_nventa[1]) + 1, 6);
              n_venta = arr_nventa[0] + '-' + new_correlativo;
            } else if (arr_nventa[1] == '999999') {
              new_serie = zfill(parseInt(arr_nventa[0]) + 1, 3);
              n_venta = new_serie + '-000001';
            }
          }

          data.nventa = n_venta;
          data.estado = 'Procesando';
          console.log(data);
          _context2.next = 12;
          return regeneratorRuntime.awrap(Venta.create(data));

        case 12:
          venta = _context2.sent;
          detalles.forEach(function _callee(element) {
            var element_producto, new_stock;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    element.venta = venta._id;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(Dventa.create(element));

                  case 3:
                    _context.next = 5;
                    return regeneratorRuntime.awrap(Producto.findById({
                      _id: element.producto
                    }));

                  case 5:
                    element_producto = _context.sent;
                    new_stock = element_producto.stock - element.cantidad;
                    _context.next = 9;
                    return regeneratorRuntime.awrap(Producto.findByIdAndUpdate({
                      _id: element.producto
                    }, {
                      stock: new_stock
                    }));

                  case 9:
                    _context.next = 11;
                    return regeneratorRuntime.awrap(Carrito.remove({
                      cliente: data.cliente
                    }));

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          res.status(200).send({
            venta: venta
          });
          _context2.next = 18;
          break;

        case 17:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Rellena de 0 una cadena


function zfill(number, width) {
  var numberOutput = Math.abs(number);
  var length = number.toString().length;
  var zero = "0";

  if (width <= length) {
    if (number < 0) {
      return "-" + numberOutput.toString();
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return "-" + zero.repeat(width - length) + numberOutput.toString();
    } else {
      return zero.repeat(width - length) + numberOutput.toString();
    }
  }
}

module.exports = {
  registro_compra_cliente: registro_compra_cliente
};