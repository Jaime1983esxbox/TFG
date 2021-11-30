'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var DventaSchema = Schema({
  // Vincular el campo producto a mi colección producto
  producto: {
    type: Schema.ObjectId,
    ref: 'producto',
    required: true
  },
  venta: {
    type: Schema.ObjectId,
    ref: 'venta',
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  variedad: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  cliente: {
    type: Schema.ObjectId,
    ref: 'cliente',
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now,
    required: true
  }
});
module.exports = mongoose.model('dventa', DventaSchema);