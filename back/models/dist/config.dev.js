'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema; // todos los campos están a true porque será un registro único

var ConfigSchema = Schema({
  categorias: [{
    type: Object,
    required: true
  }],
  titulo: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  serie: {
    type: String,
    required: true
  },
  correlativo: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('config', ConfigSchema);