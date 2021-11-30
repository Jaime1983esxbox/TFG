'use strict';

var jwt = require('jwt-simple');

var moment = require('moment');

var secret = 'pepe';

exports.auth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: 'No hay Headers'
    });
  } // reemplazar algunos caracteres para que no de error


  var token = req.headers.authorization.replace(/['"]+/g, ''); // Partir el token en sus 3 partes

  var segment = token.split('.');

  if (segment.length != 3) {
    return res.status(403).send({
      message: 'Token inválido'
    });
  } else {
    try {
      var payload = jwt.decode(token, secret); // Saber si la fecha del token ha expirado

      if (payload.exp <= moment().unix()) {
        return res.status(403).send({
          message: 'Token expirado'
        });
      }
    } catch (error) {
      return res.status(403).send({
        message: 'Token inválido'
      });
    }
  }

  req.user = payload;
  next();
};