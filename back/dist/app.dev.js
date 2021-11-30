'use strict'; // Archivo que inicializa el back-end

var express = require('express'); // variable para inicializar el módulo express


var app = express();

var bodyparser = require('body-parser'); // variable para hacer la conexión a la BBDD


var mongoose = require('mongoose');

var _require = require('express'),
    application = _require.application; // variable para el puerto de ejecución al back-end, el puerto por defecto si no está disponible


var port = process.env.PORT || 4201; // variable para crear el servidor

var server = require('http').createServer(app); // Inicialización del paquete socket.io,
// cualquier petición que venga del front-end de las cabeceras vengan de una url


var io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', function (socket) {
  socket.on('delete-carrito', function (data) {
    io.emit('new-carrito', data);
    console.log(data);
  });
  socket.on('add-carrito-add', function (data) {
    io.emit('new-carrito-add', data);
    console.log(data);
  });
}); // Obtener las rutas

var cliente_route = require('./routes/cliente');

var admin_route = require('./routes/admin');

var producto_route = require('./routes/producto');

var cupon_route = require('./routes/cupon');

var config_route = require('./routes/config');

var carrito_route = require('./routes/carrito');

var venta_route = require('./routes/venta');

var descuento_route = require('./routes/descuento'); // Conexión a la BBDD


mongoose.connect('mongodb://127.0.0.1:27017/tienda', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    server.listen(port, function () {
      console.log('Servidor funcionando en el puerto ' + port);
    });
  }
});
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json({
  limit: '50mb',
  extended: true
})); // Permite la correcta conexión entre el front-end y el back-end
//  dando los permisos correspondientes

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, x-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
}); // Para poder utilizarlo en la app

app.use('/api', cliente_route);
app.use('/api', admin_route);
app.use('/api', producto_route);
app.use('/api', cupon_route);
app.use('/api', config_route);
app.use('/api', carrito_route);
app.use('/api', venta_route);
app.use('/api', descuento_route); // Para exportar el app.js

module.exports = app;