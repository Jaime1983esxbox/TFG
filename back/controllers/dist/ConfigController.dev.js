"use strict";

// const { rawListeners } = require('../models/config');
var Config = require('../models/config');

var fs = require('fs');

var path = require('path');

var actualizar_config_admin = function actualizar_config_admin(req, res) {
  var data, img_path, name, logo_name, reg, _reg;

  return regeneratorRuntime.async(function actualizar_config_admin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.user) {
            _context.next = 25;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context.next = 22;
            break;
          }

          data = req.body; // Obtenemos nombre de la imagen y su extensión

          if (!req.files) {
            _context.next = 15;
            break;
          }

          console.log("Si hay imagen");
          img_path = req.files.logo.path;
          name = img_path.split('\\');
          logo_name = name[2]; // Actualización dle documento con su logo y nombre

          _context.next = 10;
          return regeneratorRuntime.awrap(Config.findByIdAndUpdate({
            _id: req._id
          }, {
            categorias: JSON.parse(data.categorias),
            titulo: data.titulo,
            serie: data.serie,
            logo: logo_name,
            correlativo: data.correlativo
          }));

        case 10:
          reg = _context.sent;
          // ELiminamos la imagen anterior
          fs.stat('./uploads/configuraciones/' + reg.logo, function (err) {
            if (!err) {
              fs.unlink('./uploads/configuraciones/' + reg.logo, function (err) {
                if (err) throw err;
              });
            }
          });
          res.status(200).send({
            data: reg
          });
          _context.next = 20;
          break;

        case 15:
          console.log("No hay imagen");
          _context.next = 18;
          return regeneratorRuntime.awrap(Config.findByIdAndUpdate({
            _id: "615c9331c6e43a6d6c9bfe9d"
          }, {
            categorias: data.categorias,
            titulo: data.titulo,
            serie: data.serie,
            correlativo: data.correlativo
          }));

        case 18:
          _reg = _context.sent;
          res.status(200).send({
            data: _reg
          });

        case 20:
          _context.next = 23;
          break;

        case 22:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 23:
          _context.next = 26;
          break;

        case 25:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 26:
        case "end":
          return _context.stop();
      }
    }
  });
};

var obtener_config_admin = function obtener_config_admin(req, res) {
  var reg;
  return regeneratorRuntime.async(function obtener_config_admin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.user) {
            _context2.next = 11;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context2.next = 8;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(Config.findById({
            _id: "615c9331c6e43a6d6c9bfe9d"
          }));

        case 4:
          reg = _context2.sent;
          res.status(200).send({
            data: reg
          });
          _context2.next = 9;
          break;

        case 8:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 9:
          _context2.next = 12;
          break;

        case 11:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var obtener_logo = function obtener_logo(req, res) {
  var img;
  return regeneratorRuntime.async(function obtener_logo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          img = req.params['img'];
          console.log(img);
          fs.stat('./uploads/configuraciones/' + img, function (err) {
            if (!err) {
              var path_img = './uploads/configuraciones/' + img;
              res.status(200).sendFile(path.resolve(path_img));
            } else {
              var _path_img = './uploads/default.jpg';
              res.status(200).sendFile(path.resolve(_path_img));
            }
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var obtener_config_publico = function obtener_config_publico(req, res) {
  var reg;
  return regeneratorRuntime.async(function obtener_config_publico$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Config.findById({
            _id: "615c9331c6e43a6d6c9bfe9d"
          }));

        case 2:
          reg = _context4.sent;
          res.status(200).send({
            data: reg
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  actualizar_config_admin: actualizar_config_admin,
  obtener_config_admin: obtener_config_admin,
  obtener_logo: obtener_logo,
  obtener_config_publico: obtener_config_publico
};