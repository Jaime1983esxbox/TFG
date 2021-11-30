"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.ConfigComponent = void 0;

var core_1 = require("@angular/core");

var GLOBAL_1 = require("src/app/services/GLOBAL");

var uuid_1 = require("uuid");

var ConfigComponent =
/** @class */
function () {
  function ConfigComponent(_adminService) {
    var _this = this;

    this._adminService = _adminService;
    this.config = {};
    this.titulo_cat = '';
    this.icono_cat = '';
    this.file = undefined;
    this.token = localStorage.getItem('token');
    this.url = GLOBAL_1.GLOBAL.url;

    this._adminService.obtener_config_admin(this.token).subscribe(function (response) {
      _this.config = response.data;
      _this.imgSelect = _this.url + 'obtener_logo/' + _this.config.logo;
      console.log(_this.config);
    }, function (error) {
      console.log(error);
    });
  }

  ConfigComponent.prototype.ngOnInit = function () {};

  ConfigComponent.prototype.agregar_cat = function () {
    if (this.titulo_cat && this.icono_cat) {
      console.log(uuid_1.v4());
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        // Creamos un identificador único para el título e icono para poder verificar
        // con el módulo externo uuidv4
        _id: uuid_1.v4()
      });
      this.titulo_cat = '';
      this.icono_cat = '';
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'Debe ingresar un título de icono para la categoría'
      });
    }
  };

  ConfigComponent.prototype.actualizar = function (configForm) {
    if (configForm.valid) {
      var data = {
        titulo: configForm.value.titulo,
        serie: configForm.value.serie,
        correlativo: configForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      };
      console.log(data);

      this._adminService.actualizar_config_admin("615c9331c6e43a6d6c9bfe9d", data, this.token).subscribe(function (response) {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          "class": 'text-success',
          position: 'topCenter',
          message: 'Configuración actualizada correctamente'
        });
      }, function (error) {});
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'Complete correctamente el formulario'
      });
    }
  };

  ConfigComponent.prototype.fileChangeEvent = function (event) {
    var _this = this;

    var file;

    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'No hay una imagen para enviar'
      });
    }

    if (file.size <= 4000000) {
      if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
        var reader_1 = new FileReader();

        reader_1.onload = function (e) {
          return _this.imgSelect = reader_1.result;
        };

        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        reader_1.readAsDataURL(file);
        $('#input-portada').text(file.name);
        this.file = file;
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          position: 'topCenter',
          message: 'El archivo tiene que ser una imagen'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'La imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Selecionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }

    console.log(this.file);
  }; // Va a cargar la previsualización de la imagen y actualizarla


  ConfigComponent.prototype.ngDoCheck = function () {
    $('.cs-file-drop-preview').html("<img src=" + this.imgSelect + ">");
  };

  ConfigComponent.prototype.eliminar_categoria = function (idx) {
    this.config.categorias.splice(idx, 1);
  };

  ConfigComponent = __decorate([core_1.Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
  })], ConfigComponent);
  return ConfigComponent;
}();

exports.ConfigComponent = ConfigComponent;