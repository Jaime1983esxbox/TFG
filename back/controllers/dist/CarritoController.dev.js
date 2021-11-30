"use strict";

var carrito = require('../models/carrito');

var Carrito = require('../models/carrito');

var agregar_carrito_cliente = function agregar_carrito_cliente(req, res) {
  var data, carrito_cliente, reg;
  return regeneratorRuntime.async(function agregar_carrito_cliente$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.user) {
            _context.next = 15;
            break;
          }

          data = req.body;
          _context.next = 4;
          return regeneratorRuntime.awrap(Carrito.find({
            cliente: data.cliente,
            producto: data.producto
          }));

        case 4:
          carrito_cliente = _context.sent;

          if (!(carrito_cliente.length == 0)) {
            _context.next = 12;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(Carrito.create(data));

        case 8:
          reg = _context.sent;
          res.status(200).send({
            data: reg
          });
          _context.next = 13;
          break;

        case 12:
          if (carrito_cliente.length >= 1) {
            res.status(200).send({
              data: undefined
            });
          }

        case 13:
          _context.next = 16;
          break;

        case 15:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

var obtener_carrito_cliente = function obtener_carrito_cliente(req, res) {
  var id, carrito_cliente;
  return regeneratorRuntime.async(function obtener_carrito_cliente$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.user) {
            _context2.next = 8;
            break;
          }

          id = req.params['id'];
          _context2.next = 4;
          return regeneratorRuntime.awrap(Carrito.find({
            cliente: id
          }).populate('producto'));

        case 4:
          carrito_cliente = _context2.sent;
          res.status(200).send({
            data: carrito_cliente
          });
          _context2.next = 9;
          break;

        case 8:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var eliminar_carrito_cliente = function eliminar_carrito_cliente(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function eliminar_carrito_cliente$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!req.user) {
            _context3.next = 8;
            break;
          }

          id = req.params['id'];
          _context3.next = 4;
          return regeneratorRuntime.awrap(Carrito.findByIdAndRemove({
            _id: id
          }));

        case 4:
          reg = _context3.sent;
          res.status(200).send({
            data: reg
          });
          _context3.next = 9;
          break;

        case 8:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  agregar_carrito_cliente: agregar_carrito_cliente,
  obtener_carrito_cliente: obtener_carrito_cliente,
  eliminar_carrito_cliente: eliminar_carrito_cliente
};