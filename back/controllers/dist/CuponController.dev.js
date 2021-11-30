"use strict";

var Cupon = require('../models/cupon');

var registro_cupon_admin = function registro_cupon_admin(req, res) {
  var data, reg;
  return regeneratorRuntime.async(function registro_cupon_admin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.user) {
            _context.next = 12;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context.next = 9;
            break;
          }

          data = req.body;
          _context.next = 5;
          return regeneratorRuntime.awrap(Cupon.create(data));

        case 5:
          reg = _context.sent;
          res.status(200).send({
            data: reg
          });
          _context.next = 10;
          break;

        case 9:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 10:
          _context.next = 13;
          break;

        case 12:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

var listar_cupones_admin = function listar_cupones_admin(req, res) {
  var filtro, reg;
  return regeneratorRuntime.async(function listar_cupones_admin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.user) {
            _context2.next = 12;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context2.next = 9;
            break;
          }

          filtro = req.params['filtro'];
          _context2.next = 5;
          return regeneratorRuntime.awrap(Cupon.find({
            codigo: new RegExp(filtro, 'i')
          }).sort({
            createdAt: -1
          }));

        case 5:
          reg = _context2.sent;
          res.status(200).send({
            data: reg
          });
          _context2.next = 10;
          break;

        case 9:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 10:
          _context2.next = 13;
          break;

        case 12:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var obtener_cupon_admin = function obtener_cupon_admin(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function obtener_cupon_admin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!req.user) {
            _context3.next = 18;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context3.next = 15;
            break;
          }

          id = req.params['id'];
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Cupon.findById({
            _id: id
          }));

        case 6:
          reg = _context3.sent;
          res.status(200).send({
            data: reg
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          res.status(200).send({
            data: undefined
          });

        case 13:
          _context3.next = 16;
          break;

        case 15:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 16:
          _context3.next = 19;
          break;

        case 18:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

var actualizar_cupon_admin = function actualizar_cupon_admin(req, res) {
  var data, id, reg;
  return regeneratorRuntime.async(function actualizar_cupon_admin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!req.user) {
            _context4.next = 13;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context4.next = 10;
            break;
          }

          data = req.body;
          id = req.params['id'];
          _context4.next = 6;
          return regeneratorRuntime.awrap(Cupon.findByIdAndUpdate({
            _id: id
          }, {
            codigo: data.codigo,
            tipo: data.tipo,
            valor: data.valor,
            limite: data.limite
          }));

        case 6:
          reg = _context4.sent;
          res.status(200).send({
            data: reg
          });
          _context4.next = 11;
          break;

        case 10:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 11:
          _context4.next = 14;
          break;

        case 13:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var eliminar_cupon_admin = function eliminar_cupon_admin(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function eliminar_cupon_admin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!req.user) {
            _context5.next = 12;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context5.next = 9;
            break;
          }

          id = req.params['id'];
          _context5.next = 5;
          return regeneratorRuntime.awrap(Cupon.findByIdAndRemove({
            _id: id
          }));

        case 5:
          reg = _context5.sent;
          res.status(200).send({
            data: reg
          });
          _context5.next = 10;
          break;

        case 9:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 10:
          _context5.next = 13;
          break;

        case 12:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  registro_cupon_admin: registro_cupon_admin,
  listar_cupones_admin: listar_cupones_admin,
  obtener_cupon_admin: obtener_cupon_admin,
  actualizar_cupon_admin: actualizar_cupon_admin,
  eliminar_cupon_admin: eliminar_cupon_admin
};