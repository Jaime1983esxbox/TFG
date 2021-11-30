'use strict'

var express = require('express');
var cuponController = require('../controllers/CuponController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_cupon_admin', auth.auth, cuponController.registro_cupon_admin);
api.get('/listar_cupones_admin/:filtro?', auth.auth, cuponController.listar_cupones_admin);
api.get('/obtener_cupon_admin/:id', auth.auth, cuponController.obtener_cupon_admin);
api.put('/actualizar_cupon_admin/:id', auth.auth, cuponController.actualizar_cupon_admin);
api.delete('/eliminar_cupon_admin/:id', auth.auth, cuponController.eliminar_cupon_admin);

// Para vincular a las funciones 


// Exportar la inicialización de la ruta y el controlador de Cliente
module.exports = api;