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
exports.AdminService = void 0;

var core_1 = require("@angular/core");

var GLOBAL_1 = require("./GLOBAL");

var http_1 = require("@angular/common/http");

var angular_jwt_1 = require("@auth0/angular-jwt");

var AdminService =
/** @class */
function () {
  function AdminService(_http) {
    this._http = _http;
    this.url = GLOBAL_1.GLOBAL.url;
  } // Petición


  AdminService.prototype.login_admin = function (data) {
    var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', data, {
      headers: headers
    });
  };

  AdminService.prototype.getToken = function () {
    return localStorage.getItem('token');
  }; // Para validar el token


  AdminService.prototype.isAuthenticated = function (allowRoles) {
    var token = localStorage.getItem('token'); // Verificamos si hay un token

    if (!token) {
      return false;
    } // Verificamos si el token es válido


    try {
      var helper = new angular_jwt_1.JwtHelperService(); // Decodifica el token y manda la data del usuario

      var decodedToken = helper.decodeToken(token);
      console.log(decodedToken);

      if (!decodedToken) {
        console.log('El token no es válido');
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

    return allowRoles.includes(decodedToken['role']);
  };

  AdminService.prototype.actualizar_config_admin = function (id, data, token) {
    if (data.logo) {
      var headers = new http_1.HttpHeaders({
        'authorization': token
      });
      var fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('serie', data.serie);
      fd.append('correlativo', data.correlativo);
      fd.append('categorias', JSON.stringify(data.categorias));
      fd.append('logo', data.logo);
      return this._http.put(this.url + 'actualizar_config_admin/' + id, fd, {
        headers: headers
      });
    } else {
      var headers = new http_1.HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': token
      });
      return this._http.put(this.url + 'actualizar_config_admin/' + id, data, {
        headers: headers
      });
    }
  };

  AdminService.prototype.obtener_config_admin = function (token) {
    var headers = new http_1.HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': token
    });
    return this._http.get(this.url + 'obtener_config_admin', {
      headers: headers
    });
  };

  AdminService.prototype.obtener_config_publico = function () {
    var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_config_publico', {
      headers: headers
    });
  };

  AdminService = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], AdminService);
  return AdminService;
}();

exports.AdminService = AdminService;