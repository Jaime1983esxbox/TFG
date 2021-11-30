'use strict';

var express = require('express');

var carritoController = require('../controllers/CarritoController');

var api = express.Router();

var auth = require('../middlewares/authenticate'); // Para vincular a las funciones 


api.post('/agregar_carrito_cliente', auth.auth, carritoController.agregar_carrito_cliente);
api.get('/obtener_carrito_cliente/:id', auth.auth, carritoController.obtener_carrito_cliente);
api["delete"]('/eliminar_carrito_cliente/:id', auth.auth, carritoController.eliminar_carrito_cliente); // Exportar la inicialización de la ruta y el controlador de Cliente

module.exports = api;