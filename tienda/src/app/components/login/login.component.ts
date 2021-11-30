import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public newUser: any = {};
  public usuario: any = {};
  public token:any;
  public load_btn = false;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router
    ) {
      this.token = localStorage.getItem('token');
      if(this.token){
        this._router.navigate(['/']);
      }
    }

  ngOnInit(): void {
  }

  login(loginForm: any){
    if(loginForm.valid){

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteService.login_cliente(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              position: 'topCenter',
              message: response.message
            });  
          }else{
            this.usuario = response.data;

            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);

            this.user.email = '';
            this.user.password = '';

            this._router.navigate(['./']);
          }
        },
        error=>{
          console.log(error);
        }
      );
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'Datos incorrectos'
      });  
    }
  }

  registro(registroForm: any){
    if(registroForm.valid){
      
      let data = {
        nombre: this.newUser.nombre,
        apellidos: this.newUser.apellidos,
        email: this.newUser.email,
        password: this.newUser.password,
        telefono: this.newUser.telefono,
        f_nacimiento: this.newUser.f_nacimiento,
        dni: this.newUser.dni,
        genero: this.newUser.genero,
        pais: this.newUser.pais
      }

      this._clienteService.registro_cliente(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              position: 'topCenter',
              message: response.message
            });  
          }else{
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              position: 'topCenter',
              message: 'Cliente registrado correctamente'
            });
            this.usuario = response.data;

            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);

              this.newUser.nombre = '';
              this.newUser.apellidos = '';
              this.newUser.email = '';
              this.newUser.password = '';
              this.newUser.telefono = '';
              this.newUser.f_nacimiento = '';
              this.newUser.dni = '';
              this.newUser.genero = '';
              this.newUser.pais = '';

            this._router.navigate(['./login']);
          }
        },
        error=>{
          console.log(error);
        }
      );
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'Datos incorrectos'
      });  
    }
  }

  // registro(registroForm: any){
  //   if(registroForm.valid){
  //     console.log(this.cliente);
  //     this.load_btn = true;
  //     this._clienteService.registro_cliente(this.cliente, this.token).subscribe(
  //       response=>{
  //         console.log(response);
  //         iziToast.show({
  //           title: 'SUCCESS',
  //           titleColor: '#1DC74C',
  //           class: 'text-success',
  //           position: 'topCenter',
  //           message: 'Cliente registrado correctamente'
  //         });

  //         this.cliente = {
  //           nombre: '',
  //           apellidos: '',
  //           email: '',
  //           telefono: '', 
  //           f_nacimiento: '',
  //           dni: '',
  //           genero: ''
  //         }

  //           this.load_btn = false;
  //         this._router.navigate(['/panel/clientes']);
  //       },
  //       error=>{
  //         console.log(error);
  //       }
  //     );
  //   }else{
  //     iziToast.show({
  //       title: 'ERROR',
  //       titleColor: '#FF0000',
  //       position: 'topCenter',
  //       message: 'Datos incorrectos'
  //     });
  //   }  
  // }

}
