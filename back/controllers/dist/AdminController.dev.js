'use strict';

var Admin = require('../models/admin');

var Contacto = require('../models/contacto');

var bcrypt = require('bcrypt-nodejs');

var jwt = require('../helpers/jwt');

var registro_admin = function registro_admin(req, res) {
  var data, admin_arr;
  return regeneratorRuntime.async(function registro_admin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Los datos que enviamos estarán en el cuerpo del request
          data = req.body;
          admin_arr = [];
          _context2.next = 4;
          return regeneratorRuntime.awrap(Admin.find({
            email: data.email
          }));

        case 4:
          admin_arr = _context2.sent;

          if (admin_arr.length == 0) {
            if (data.password) {
              bcrypt.hash(data.password, null, null, function _callee(err, hash) {
                var reg;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!hash) {
                          _context.next = 8;
                          break;
                        }

                        data.password = hash; // Registro de usuario

                        _context.next = 4;
                        return regeneratorRuntime.awrap(Admin.create(data));

                      case 4:
                        reg = _context.sent;
                        res.status(200).send({
                          data: reg
                        });
                        _context.next = 9;
                        break;

                      case 8:
                        res.status(200).send({
                          message: 'Error server',
                          data: undefined
                        });

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              });
            } else {
              res.status(200).send({
                message: 'No hay contraseña',
                data: undefined
              });
            }
          } else {
            res.status(200).send({
              message: 'Correo existente en la BBDD',
              data: undefined
            });
          }

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var login_admin = function login_admin(req, res) {
  var data, admin_arr, user;
  return regeneratorRuntime.async(function login_admin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          data = req.body;
          admin_arr = [];
          _context4.next = 4;
          return regeneratorRuntime.awrap(Admin.find({
            email: data.email
          }));

        case 4:
          admin_arr = _context4.sent;

          if (admin_arr.length == 0) {
            res.status(200).send({
              message: 'email no encontrado',
              data: undefined
            });
          } else {
            // Login
            user = admin_arr[0];
            bcrypt.compare(data.password, user.password, function _callee2(error, check) {
              return regeneratorRuntime.async(function _callee2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (check) {
                        res.status(200).send({
                          data: user,
                          token: jwt.createToken(user)
                        });
                      } else {
                        res.status(200).send({
                          message: 'La contraseña no coincide',
                          data: undefined
                        });
                      }

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
          }

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var obtener_mensajes_admin = function obtener_mensajes_admin(req, res) {
  var reg;
  return regeneratorRuntime.async(function obtener_mensajes_admin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!req.user) {
            _context5.next = 11;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context5.next = 8;
            break;
          }

          _context5.next = 4;
          return regeneratorRuntime.awrap(Contacto.find().sort({
            createdAt: -1
          }));

        case 4:
          reg = _context5.sent;
          res.status(200).send({
            data: reg
          });
          _context5.next = 9;
          break;

        case 8:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 9:
          _context5.next = 12;
          break;

        case 11:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var cerrar_mensaje_admin = function cerrar_mensaje_admin(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function cerrar_mensaje_admin$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!req.user) {
            _context6.next = 12;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context6.next = 9;
            break;
          }

          id = req.params['id'];
          _context6.next = 5;
          return regeneratorRuntime.awrap(Contacto.findByIdAndUpdate({
            _id: id
          }, {
            estado: 'Cerrado'
          }));

        case 5:
          reg = _context6.sent;
          res.status(200).send({
            data: reg
          });
          _context6.next = 10;
          break;

        case 9:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 10:
          _context6.next = 13;
          break;

        case 12:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  });
};

module.exports = {
  registro_admin: registro_admin,
  login_admin: login_admin,
  obtener_mensajes_admin: obtener_mensajes_admin,
  cerrar_mensaje_admin: cerrar_mensaje_admin
};