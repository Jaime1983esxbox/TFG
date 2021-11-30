'use strict';

var Cliente = require('../models/cliente');

var Contacto = require('../models/contacto');

var Venta = require('../models/venta');

var Dventa = require('../models/dventa');

var Review = require('../models/review');

var bcrypt = require('bcrypt-nodejs');

var jwt = require('../helpers/jwt');

var cliente = require('../models/cliente');

var direccion = require('../models/direccion');

var registro_cliente = function registro_cliente(req, res) {
  var data, clientes_arr;
  return regeneratorRuntime.async(function registro_cliente$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Los datos que enviamos estarán en el cuerpo del request
          data = req.body;
          clientes_arr = [];
          _context2.next = 4;
          return regeneratorRuntime.awrap(Cliente.find({
            email: data.email
          }));

        case 4:
          clientes_arr = _context2.sent;

          if (clientes_arr.length == 0) {
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
                        return regeneratorRuntime.awrap(Cliente.create(data));

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

var login_cliente = function login_cliente(req, res) {
  var data, cliente_arr, user;
  return regeneratorRuntime.async(function login_cliente$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          data = req.body;
          cliente_arr = [];
          _context4.next = 4;
          return regeneratorRuntime.awrap(Cliente.find({
            email: data.email
          }));

        case 4:
          cliente_arr = _context4.sent;

          if (cliente_arr.length == 0) {
            res.status(200).send({
              message: 'email no encontrado',
              data: undefined
            });
          } else {
            // Login
            user = cliente_arr[0];
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

var listar_clientes_filtro_admin = function listar_clientes_filtro_admin(req, res) {
  var tipo, filtro, reg, _reg, _reg2;

  return regeneratorRuntime.async(function listar_clientes_filtro_admin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log(req.user);

          if (!req.user) {
            _context5.next = 29;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context5.next = 26;
            break;
          }

          tipo = req.params['tipo'];
          filtro = req.params['filtro'];

          if (!(tipo == null || tipo == 'null')) {
            _context5.next = 12;
            break;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(Cliente.find());

        case 8:
          reg = _context5.sent;
          res.status(200).send({
            data: reg
          });
          _context5.next = 24;
          break;

        case 12:
          if (!(tipo == 'apellidos')) {
            _context5.next = 19;
            break;
          }

          _context5.next = 15;
          return regeneratorRuntime.awrap(Cliente.find({
            apellidos: new RegExp(filtro, 'i')
          }));

        case 15:
          _reg = _context5.sent;
          res.status(200).send({
            data: _reg
          });
          _context5.next = 24;
          break;

        case 19:
          if (!(tipo == 'email')) {
            _context5.next = 24;
            break;
          }

          _context5.next = 22;
          return regeneratorRuntime.awrap(Cliente.find({
            email: new RegExp(filtro, 'i')
          }));

        case 22:
          _reg2 = _context5.sent;
          res.status(200).send({
            data: _reg2
          });

        case 24:
          _context5.next = 27;
          break;

        case 26:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 27:
          _context5.next = 30;
          break;

        case 29:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 30:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var registro_cliente_admin = function registro_cliente_admin(req, res) {
  var data;
  return regeneratorRuntime.async(function registro_cliente_admin$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (req.user) {
            if (req.user.role == 'Admin') {
              data = req.body;
              bcrypt.hash('12345678', null, null, function _callee3(err, hash) {
                var reg;
                return regeneratorRuntime.async(function _callee3$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!hash) {
                          _context6.next = 8;
                          break;
                        }

                        data.password = hash;
                        _context6.next = 4;
                        return regeneratorRuntime.awrap(cliente.create(data));

                      case 4:
                        reg = _context6.sent;
                        res.status(200).send({
                          data: reg
                        });
                        _context6.next = 9;
                        break;

                      case 8:
                        res.status(200).send({
                          message: 'Error en el servidor',
                          data: undefined
                        });

                      case 9:
                      case "end":
                        return _context6.stop();
                    }
                  }
                });
              });
            } else {
              res.status(500).send({
                message: 'Acceso no permitido'
              });
            }
          } else {
            res.status(500).send({
              message: 'Acceso no permitido'
            });
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var obtener_cliente_admin = function obtener_cliente_admin(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function obtener_cliente_admin$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!req.user) {
            _context8.next = 18;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context8.next = 15;
            break;
          }

          id = req.params['id'];
          _context8.prev = 3;
          _context8.next = 6;
          return regeneratorRuntime.awrap(cliente.findById({
            _id: id
          }));

        case 6:
          reg = _context8.sent;
          res.status(200).send({
            data: reg
          });
          _context8.next = 13;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](3);
          res.status(200).send({
            data: undefined
          });

        case 13:
          _context8.next = 16;
          break;

        case 15:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 16:
          _context8.next = 19;
          break;

        case 18:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

var actualizar_cliente_admin = function actualizar_cliente_admin(req, res) {
  var id, data, reg;
  return regeneratorRuntime.async(function actualizar_cliente_admin$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!req.user) {
            _context9.next = 13;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context9.next = 10;
            break;
          }

          id = req.params['id'];
          data = req.body;
          _context9.next = 6;
          return regeneratorRuntime.awrap(cliente.findByIdAndUpdate({
            _id: id
          }, {
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            f_nacimiento: data.f_nacimiento,
            dni: data.dni,
            gener: data.genero
          }));

        case 6:
          reg = _context9.sent;
          res.status(200).send({
            data: reg
          });
          _context9.next = 11;
          break;

        case 10:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 11:
          _context9.next = 14;
          break;

        case 13:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var eliminar_cliente_admin = function eliminar_cliente_admin(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function eliminar_cliente_admin$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (!req.user) {
            _context10.next = 12;
            break;
          }

          if (!(req.user.role == 'Admin')) {
            _context10.next = 9;
            break;
          }

          id = req.params['id'];
          _context10.next = 5;
          return regeneratorRuntime.awrap(cliente.findByIdAndRemove({
            _id: id
          }));

        case 5:
          reg = _context10.sent;
          res.status(200).send({
            data: reg
          });
          _context10.next = 10;
          break;

        case 9:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 10:
          _context10.next = 13;
          break;

        case 12:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var obtener_cliente_guest = function obtener_cliente_guest(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function obtener_cliente_guest$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (!req.user) {
            _context11.next = 14;
            break;
          }

          id = req.params['id'];
          _context11.prev = 2;
          _context11.next = 5;
          return regeneratorRuntime.awrap(cliente.findById({
            _id: id
          }));

        case 5:
          reg = _context11.sent;
          res.status(200).send({
            data: reg
          });
          _context11.next = 12;
          break;

        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](2);
          res.status(200).send({
            data: undefined
          });

        case 12:
          _context11.next = 15;
          break;

        case 14:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 15:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

var actualizar_perfil_cliente_guest = function actualizar_perfil_cliente_guest(req, res) {
  var id, data, reg;
  return regeneratorRuntime.async(function actualizar_perfil_cliente_guest$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          if (!req.user) {
            _context13.next = 16;
            break;
          }

          id = req.params['id'];
          data = req.body;
          console.log(data.password);

          if (!data.password) {
            _context13.next = 9;
            break;
          }

          console.log('Con contraseña');
          bcrypt.hash(data.password, null, null, function _callee4(err, hash) {
            var reg;
            return regeneratorRuntime.async(function _callee4$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.next = 2;
                    return regeneratorRuntime.awrap(Cliente.findByIdAndUpdate({
                      _id: id
                    }, {
                      nombre: data.nombre,
                      apellidos: data.apellidos,
                      telefono: data.telefono,
                      f_nacimiento: data.f_nacimiento,
                      dni: data.dni,
                      genero: data.genero,
                      pais: data.pais,
                      password: hash
                    }));

                  case 2:
                    reg = _context12.sent;
                    res.status(200).send({
                      data: reg
                    });

                  case 4:
                  case "end":
                    return _context12.stop();
                }
              }
            });
          });
          _context13.next = 14;
          break;

        case 9:
          console.log('Sin contraseña');
          _context13.next = 12;
          return regeneratorRuntime.awrap(Cliente.findByIdAndUpdate({
            _id: id
          }, {
            nombre: data.nombre,
            apellidos: data.apellidos,
            telefono: data.telefono,
            f_nacimiento: data.f_nacimiento,
            dni: data.dni,
            genero: data.genero,
            pais: data.pais
          }));

        case 12:
          reg = _context13.sent;
          res.status(200).send({
            data: reg
          });

        case 14:
          _context13.next = 17;
          break;

        case 16:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 17:
        case "end":
          return _context13.stop();
      }
    }
  });
};
/*********** Direcciones **********************/


var registro_direccion_cliente = function registro_direccion_cliente(req, res) {
  var data, direcciones, reg;
  console.log(data);
  return regeneratorRuntime.async(function registro_direccion_cliente$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          if (!req.user) {
            _context15.next = 13;
            break;
          }

          data = req.body;
          
          if (!data.principal) {
            _context15.next = 7;
            break;
          }

          _context15.next = 5;
          return regeneratorRuntime.awrap(direccion.find({
            cliente: data.cliente
          }));

        case 5:
          direcciones = _context15.sent;
          direcciones.forEach(function _callee5(element) {
            return regeneratorRuntime.async(function _callee5$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return regeneratorRuntime.awrap(direccion.findByIdAndUpdate({
                      _id: element._id
                    }, {
                      principal: false
                    }));

                  case 2:
                  case "end":
                    return _context14.stop();
                }
              }
            });
          });

        case 7:
          _context15.next = 9;
          return regeneratorRuntime.awrap(direccion.create(data));

        case 9:
          reg = _context15.sent;
          res.status(200).send({
            data: reg
          });
          _context15.next = 14;
          break;

        case 13:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 14:
        case "end":
          return _context15.stop();
      }
    }
  });
};

var obtener_direccion_todos_cliente = function obtener_direccion_todos_cliente(req, res) {
  var id, direcciones;
  return regeneratorRuntime.async(function obtener_direccion_todos_cliente$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          if (!req.user) {
            _context16.next = 8;
            break;
          }

          id = req.params['id'];
          _context16.next = 4;
          return regeneratorRuntime.awrap(direccion.find({
            cliente: id
          }).populate('cliente').sort({
            createdAt: -1
          }));

        case 4:
          direcciones = _context16.sent;
          res.status(200).send({
            data: direcciones
          });
          _context16.next = 9;
          break;

        case 8:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 9:
        case "end":
          return _context16.stop();
      }
    }
  });
};

var cambiar_direccion_principal_cliente = function cambiar_direccion_principal_cliente(req, res) {
  var id, cliente, direcciones;
  return regeneratorRuntime.async(function cambiar_direccion_principal_cliente$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          if (!req.user) {
            _context18.next = 12;
            break;
          }

          id = req.params['id'];
          cliente = req.params['cliente'];
          _context18.next = 5;
          return regeneratorRuntime.awrap(direccion.find({
            cliente: cliente
          }));

        case 5:
          direcciones = _context18.sent;
          direcciones.forEach(function _callee6(element) {
            return regeneratorRuntime.async(function _callee6$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    _context17.next = 2;
                    return regeneratorRuntime.awrap(direccion.findByIdAndUpdate({
                      _id: element._id
                    }, {
                      principal: false
                    }));

                  case 2:
                  case "end":
                    return _context17.stop();
                }
              }
            });
          });
          _context18.next = 9;
          return regeneratorRuntime.awrap(direccion.findByIdAndUpdate({
            _id: id
          }, {
            principal: true
          }));

        case 9:
          res.status(200).send({
            data: true
          });
          _context18.next = 13;
          break;

        case 12:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 13:
        case "end":
          return _context18.stop();
      }
    }
  });
};

var obtener_direccion_principal_cliente = function obtener_direccion_principal_cliente(req, res) {
  var id, direccion_principal;
  return regeneratorRuntime.async(function obtener_direccion_principal_cliente$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          if (!req.user) {
            _context19.next = 9;
            break;
          }

          id = req.params['id'];
          direccion_principal = undefined;
          _context19.next = 5;
          return regeneratorRuntime.awrap(direccion.findOne({
            cliente: id,
            principal: true
          }));

        case 5:
          direccion_principal = _context19.sent;

          if (direccion_principal == undefined) {
            res.status(200).send({
              data: undefined
            });
          } else {
            res.status(200).send({
              data: direccion_principal
            });
          }

          _context19.next = 10;
          break;

        case 9:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 10:
        case "end":
          return _context19.stop();
      }
    }
  });
};
/********** Contacto ***************/


var enviar_mensaje_contacto = function enviar_mensaje_contacto(req, res) {
  var data, reg;
  return regeneratorRuntime.async(function enviar_mensaje_contacto$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          data = req.body;
          data.estado = 'Abierto';
          _context20.next = 4;
          return regeneratorRuntime.awrap(Contacto.create(data));

        case 4:
          reg = _context20.sent;
          res.status(200).send({
            data: reg
          });

        case 6:
        case "end":
          return _context20.stop();
      }
    }
  });
};
/*********** Órdenes ******************/


var obtener_ordenes_cliente = function obtener_ordenes_cliente(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function obtener_ordenes_cliente$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          if (!req.user) {
            _context21.next = 8;
            break;
          }

          id = req.params['id'];
          _context21.next = 4;
          return regeneratorRuntime.awrap(Venta.find({
            cliente: id
          }).sort({
            createdAt: -1
          }));

        case 4:
          reg = _context21.sent;

          if (reg.length >= 1) {
            res.status(200).send({
              data: reg
            });
          } else if (reg.length == 0) {
            res.status(200).send({
              data: undefined
            });
          }

          _context21.next = 9;
          break;

        case 8:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 9:
        case "end":
          return _context21.stop();
      }
    }
  });
};

var obtener_detalles_ordenes_cliente = function obtener_detalles_ordenes_cliente(req, res) {
  var id, venta, detalles;
  return regeneratorRuntime.async(function obtener_detalles_ordenes_cliente$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          if (!req.user) {
            _context22.next = 17;
            break;
          }

          id = req.params['id'];
          _context22.prev = 2;
          _context22.next = 5;
          return regeneratorRuntime.awrap(Venta.findById({
            _id: id
          }).populate('direccion'));

        case 5:
          venta = _context22.sent;
          _context22.next = 8;
          return regeneratorRuntime.awrap(Dventa.find({
            venta: id
          }).populate('producto'));

        case 8:
          detalles = _context22.sent;
          res.status(200).send({
            data: venta,
            detalles: detalles
          });
          _context22.next = 15;
          break;

        case 12:
          _context22.prev = 12;
          _context22.t0 = _context22["catch"](2);
          res.status(200).send({
            data: undefined
          });

        case 15:
          _context22.next = 18;
          break;

        case 17:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 18:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[2, 12]]);
};
/******** Reviews **********/


var emitir_review_producto_cliente = function emitir_review_producto_cliente(req, res) {
  var data, reg;
  return regeneratorRuntime.async(function emitir_review_producto_cliente$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          if (!req.user) {
            _context23.next = 8;
            break;
          }

          data = req.body;
          _context23.next = 4;
          return regeneratorRuntime.awrap(Review.create(data));

        case 4:
          reg = _context23.sent;
          res.status(200).send({
            data: reg
          });
          _context23.next = 9;
          break;

        case 8:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 9:
        case "end":
          return _context23.stop();
      }
    }
  });
};

var obtener_review_producto_cliente = function obtener_review_producto_cliente(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function obtener_review_producto_cliente$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          id = req.params['id'];
          _context24.next = 3;
          return regeneratorRuntime.awrap(Review.find({
            producto: id
          }).sort({
            createdAt: -1
          }));

        case 3:
          reg = _context24.sent;
          res.status(200).send({
            data: reg
          });

        case 5:
        case "end":
          return _context24.stop();
      }
    }
  });
};

var obtener_reviews_cliente = function obtener_reviews_cliente(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function obtener_reviews_cliente$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          if (!req.user) {
            _context25.next = 8;
            break;
          }

          id = req.params['id'];
          _context25.next = 4;
          return regeneratorRuntime.awrap(Review.find({
            cliente: id
          }).populate('cliente'));

        case 4:
          reg = _context25.sent;
          res.status(200).send({
            data: reg
          });
          _context25.next = 9;
          break;

        case 8:
          res.status(500).send({
            message: 'Acceso no permitido'
          });

        case 9:
        case "end":
          return _context25.stop();
      }
    }
  });
};

module.exports = {
  registro_cliente: registro_cliente,
  login_cliente: login_cliente,
  listar_clientes_filtro_admin: listar_clientes_filtro_admin,
  registro_cliente_admin: registro_cliente_admin,
  obtener_cliente_admin: obtener_cliente_admin,
  actualizar_cliente_admin: actualizar_cliente_admin,
  eliminar_cliente_admin: eliminar_cliente_admin,
  obtener_cliente_guest: obtener_cliente_guest,
  actualizar_perfil_cliente_guest: actualizar_perfil_cliente_guest,
  registro_direccion_cliente: registro_direccion_cliente,
  obtener_direccion_todos_cliente: obtener_direccion_todos_cliente,
  cambiar_direccion_principal_cliente: cambiar_direccion_principal_cliente,
  obtener_direccion_principal_cliente: obtener_direccion_principal_cliente,
  enviar_mensaje_contacto: enviar_mensaje_contacto,
  obtener_ordenes_cliente: obtener_ordenes_cliente,
  obtener_detalles_ordenes_cliente: obtener_detalles_ordenes_cliente,
  emitir_review_producto_cliente: emitir_review_producto_cliente,
  obtener_review_producto_cliente: obtener_review_producto_cliente,
  obtener_reviews_cliente: obtener_reviews_cliente
};