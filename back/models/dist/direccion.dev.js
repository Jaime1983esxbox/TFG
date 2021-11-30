'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var DireccionSchema = Schema({
  // Vincular el campo producto a mi colección producto
  cliente: {
    type: Schema.ObjectId,
    ref: 'cliente',
    required: true
  },
  destinatario: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true
  },
  cip: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true
  },
  comunidad_autonoma: {
    type: String,
    required: false
  },
  provincia: {
    type: String,
    required: false
  },
  ciudad: {
    type: String,
    required: false
  },
  telefono: {
    type: String,
    required: true
  },
  principal: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now,
    required: true
  }
});
module.exports = mongoose.model('direccion', DireccionSchema);