import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';

declare var $: any;
declare var iziToast:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public token: any;
  public id: any;
  public user: any = undefined;
  public user_lc: any = undefined;
  public config_global: any = {};
  public op_cart = false;
  public carrito_arr: Array<any> = [];
  public url;
  public subtotal = 0;
  public socket = io('http://localhost:4201');
  public descuento_activo: any = undefined;
  
  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
    private _guestService: GuestService
    ) {
    this.url = GLOBAL.url;  
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    this._clienteService.obtener_config_publico().subscribe(
      response=>{
        this.config_global = response.data;
      }
    )

    if(this.token){
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        response=>{
          this.user = response.data;
          localStorage.setItem('user_data',JSON.stringify(this.user));
          if(localStorage.getItem('user_data')){
            var user_data:any = localStorage.getItem('user_data');
            this.user_lc = JSON.parse(user_data);

            this.obtener_carrito();
          }else{
            this.user_lc = undefined;
          }
        },
        error=>{
          console.log(error);
          this.user = undefined;
        }
      );
    }
  }

  obtener_carrito(){
    this._clienteService.obtener_carrito_cliente(this.user_lc._id, this.token).subscribe(
      response=>{
        this.carrito_arr = response.data;
        this.calcular_carrito();
      }
    );
  }

  ngOnInit(): void {
    this.socket.on('new-carrito', (data) =>{
      console.log(data);
      this.obtener_carrito();
    });

    this.socket.on('new-carrito-add', (data) =>{
      console.log(data);
      this.obtener_carrito();
    });

    this._guestService.obtener_descuento_activo().subscribe(
      response=>{
        if(response.data != undefined){
          this.descuento_activo = response.data[0];
        }else{
          this.descuento_activo = undefined;
        }
      }
    );
  }

  logout() {
    window.location.reload(); //para refrescar la pagina
    localStorage.clear();
    this._router.navigate(['/']);
  }
  
  op_modalCart(){
    if(!this.op_cart){
      this.op_cart = true;
      $('#cart').addClass('show');
    }else{
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

  calcular_carrito(){
    this.subtotal = 0;
    if(this.descuento_activo == undefined){
      this.carrito_arr.forEach(element => {
        this.subtotal = this.subtotal + (parseInt(element.producto.precio) * parseInt(element.cantidad));
      });
    }else if(this.descuento_activo != undefined){
      this.carrito_arr.forEach(element => {
        let new_precio = parseInt(element.producto.precio) - (parseInt(element.producto.precio)* this.descuento_activo.descuento)/100;
        this.subtotal = this.subtotal + (new_precio * parseInt(element.cantidad));
      });
    }
  }

  eliminar_item(id: any){
    this._clienteService.eliminar_carrito_cliente(id, this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topCenter',
          message: 'Producto eliminado del carrito correctamente'
        });
        this.socket.emit('delete-carrito', {data:response.data});
        console.log(response);
        
      }
    )
  }

}
