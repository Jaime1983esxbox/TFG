"use strict";

var Descuento = require('../models/descuento');

var fs = require('fs');

var path = require('path');

var registro_descuento_admin = function registro_descuento_admin(req, res) {
  var data, img_path, name, banner_name, reg;
  return regeneratorRuntime.async(function registro_descuento_admin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.user) {
            _context.next = 16;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context.next = 13;
            break;
          }

          data = req.body;
          img_path = req.files.banner.path;
          name = img_path.split('\\');
          banner_name = name[2];
          data.banner = banner_name;
          _context.next = 9;
          return regeneratorRuntime.awrap(Descuento.create(data));

        case 9:
          reg = _context.sent;
          res.status(200).send({
            data: reg
          });
          _context.next = 14;
          break;

        case 13:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 14:
          _context.next = 17;
          break;

        case 16:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};

var listar_descuentos_admin = function listar_descuentos_admin(req, res) {
  var filtro, reg;
  return regeneratorRuntime.async(function listar_descuentos_admin$(_context2) {
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
          return regeneratorRuntime.awrap(Descuento.find({
            titulo: new RegExp(filtro, 'i')
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

var obtener_banner_descuento = function obtener_banner_descuento(req, res) {
  var img;
  return regeneratorRuntime.async(function obtener_banner_descuento$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          img = req.params['img'];
          fs.stat('./uploads/descuentos/' + img, function (err) {
            if (!err) {
              var path_img = './uploads/descuentos/' + img;
              res.status(200).sendFile(path.resolve(path_img));
            } else {
              var _path_img = './uploads/default.jpg';
              res.status(200).sendFile(path.resolve(_path_img));
            }
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var obtener_descuento_admin = function obtener_descuento_admin(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function obtener_descuento_admin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!req.user) {
            _context4.next = 18;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context4.next = 15;
            break;
          }

          id = req.params['id'];
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Descuento.findById({
            _id: id
          }));

        case 6:
          reg = _context4.sent;
          res.status(200).send({
            data: reg
          });
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](3);
          res.status(200).send({
            data: undefined
          });

        case 13:
          _context4.next = 16;
          break;

        case 15:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 16:
          _context4.next = 19;
          break;

        case 18:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

var actualizar_descuento_admin = function actualizar_descuento_admin(req, res) {
  var id, data, img_path, name, banner_name, reg, _reg;

  return regeneratorRuntime.async(function actualizar_descuento_admin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!req.user) {
            _context5.next = 24;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context5.next = 21;
            break;
          }

          id = req.params['id'];
          data = req.body;

          if (!req.files) {
            _context5.next = 15;
            break;
          }

          img_path = req.files.banner.path;
          name = img_path.split('\\');
          banner_name = name[2];
          _context5.next = 10;
          return regeneratorRuntime.awrap(Descuento.findByIdAndUpdate({
            _id: id
          }, {
            titulo: data.titulo,
            descuento: data.descuento,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin,
            banner: banner_name
          }));

        case 10:
          reg = _context5.sent;
          fs.stat('./uploads/descuentos/' + reg.banner, function (err) {
            if (!err) {
              fs.unlink('./uploads/descuentos/' + reg.banner, function (err) {
                if (err) throw err;
              });
            }
          });
          res.status(200).send({
            data: reg
          });
          _context5.next = 19;
          break;

        case 15:
          _context5.next = 17;
          return regeneratorRuntime.awrap(Descuento.findByIdAndUpdate({
            _id: id
          }, {
            titulo: data.titulo,
            descuento: data.descuento,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin
          }));

        case 17:
          _reg = _context5.sent;
          res.status(200).send({
            data: _reg
          });

        case 19:
          _context5.next = 22;
          break;

        case 21:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 22:
          _context5.next = 25;
          break;

        case 24:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var eliminar_descuento_admin = function eliminar_descuento_admin(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function eliminar_descuento_admin$(_context6) {
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
          return regeneratorRuntime.awrap(Descuento.findByIdAndRemove({
            _id: id
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

var obtener_descuento_activo = function obtener_descuento_activo(req, res) {
  var descuentos, arr_descuentos, today;
  return regeneratorRuntime.async(function obtener_descuento_activo$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Descuento.find().sort({
            createdAt: -1
          }));

        case 2:
          descuentos = _context7.sent;
          arr_descuentos = [];
          today = Date.parse(new Date().toString()) / 1000;
          descuentos.forEach(function (element) {
            var tt_inicio = Date.parse(element.fecha_inicio + "T00:00:00") / 1000;
            var tt_fin = Date.parse(element.fecha_fin + "T23:59:59") / 1000;

            if (today >= tt_inicio && today <= tt_fin) {
              arr_descuentos.push(element);
            }
          });

          if (arr_descuentos.length >= 1) {
            res.status(200).send({
              data: arr_descuentos
            });
          } else {
            res.status(200).send({
              data: undefined
            });
          }

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
};

module.exports = {
  registro_descuento_admin: registro_descuento_admin,
  listar_descuentos_admin: listar_descuentos_admin,
  obtener_banner_descuento: obtener_banner_descuento,
  obtener_descuento_admin: obtener_descuento_admin,
  actualizar_descuento_admin: actualizar_descuento_admin,
  eliminar_descuento_admin: eliminar_descuento_admin,
  obtener_descuento_activo: obtener_descuento_activo
};