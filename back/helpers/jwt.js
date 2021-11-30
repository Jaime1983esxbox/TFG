'use strict'

var moment = require('moment'); 
var jwt = require('jwt-simple'); // Paquete para decodificar tokens
var secret = 'pepe';

exports.createToken = function(user){
    var payLoad = {
        sub: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        // Fecha en la que se creó el token 
        iat: moment().unix(), 
        //  Fecha en la que expira el token
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payLoad,secret);
}