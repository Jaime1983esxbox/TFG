import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';
import { Router } from '@angular/router';

declare var iziToast:any;
declare var Cleave: any;
declare var StickySidebar: any;
declare var paypal: any;

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  @ViewChild('paypalButton', { static: true })
  paypalElement!: ElementRef;
  
  public idCliente;
  public token;
  public carrito_arr: Array<any> = [];
  public url;
  public subtotal = 0;
  public total_pagar: any = 0;
  public socket = io('http://localhost:4201');
  public direccion_principal: any = {};
  public envios: Array<any> = [];
  public precio_envio = "0";
  public venta: any = {};
  public dventa: Array<any> = [];
  public card_data: any = {};
  public btn_load = false;
  public carrito_load = true;
  public user: any = {};
  public descuento = 0;
  public error_cupon = '';
  public descuento_activo: any = undefined;
  public formaPago: string = 'card';

  constructor(
    private _clienteService: ClienteService,
    private _guestService: GuestService,
    private _router: Router
  ) {
    this.idCliente = localStorage.getItem('_id');
    this.venta.cliente = this.idCliente;
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    

    this._guestService.get_envios().subscribe(
      response=>{
        this.envios = response;
      }
    )
    var user_data: any = localStorage.getItem('user_data');
    this.user = JSON.parse(user_data);
  }

  ngOnInit(): void {

    this._guestService.obtener_descuento_activo().subscribe(
      response=>{
        if(response.data != undefined){
          this.descuento_activo = response.data[0];
        }else{
          this.descuento_activo = undefined;
        }
      }
    );

    this.init_data();
    setTimeout(() => {
      new Cleave('#cc-number', {
        creditCard: true,
          onCreditCardTypeChanged: function (type: any) {

          }
      }),
      new Cleave('#cc-exp-date', {
        date: true,
        datePattern: ['m', 'Y']
      }); 
      new Cleave('#cc-cvc', {
        numericOnly: true
      });
      var sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20});
    });

    this.get_direccion_principal();

    paypal.Buttons({
      style: {
          layout: 'horizontal'
      },
      createOrder: (data: any,actions: any)=>{
  
          return actions.order.create({
            purchase_units : [{
              description : 'Nombre del pago',
              amount : {
                currency_code : 'USD',
                value: 999
              },
            }]
          });
        
      },
      onApprove : async (data: any,actions: any)=>{
        const order = await actions.order.capture();
        
        this.venta.transaccion = order.purchase_units[0].payments.captures[0].id;

        this.venta.detalles = this.dventa;
        this._clienteService.registro_compra_cliente(this.venta, this.token).subscribe(
          response=>{
            this._router.navigate(['/cuenta/ordenes']);
            
          }
        )
        
      },
      onError : (err: any) =>{
       
      },
      onCancel: function (data: any, actions: any) {
        
      }
    }).render(this.paypalElement.nativeElement);
  
  }

  init_data(){
    console.log(this.carrito_arr);
    this._clienteService.obtener_carrito_cliente(this.idCliente, this.token).subscribe(
      response=>{
        this.carrito_arr = response.data;

        this.carrito_arr.forEach(element => {
          this.dventa.push({
            producto: element.producto._id,
            subtotal: element.producto.precio,
            variedad: element.variedad,
            cantidad: element.cantidad,
            cliente: localStorage.getItem('_id')
          });
        });

        setTimeout(() => {
          this.carrito_load = false;
        }, 500);
        this.calcular_carrito();
        this.calcular_total('Envío gratuito');
      }
    );
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
        this.init_data();
      }
    )
  }

  get_direccion_principal(){
    this._clienteService.obtener_direccion_principal_cliente(localStorage.getItem('_id'), this.token).subscribe(
      response=>{
        if(response.data == undefined){
          this.direccion_principal = undefined;
        }else{
          this.direccion_principal = response.data;
          this.venta.direccion = this.direccion_principal._id;
          this.calcular_total('Envío gratuito');
        }
        
      }
    )
  }

  calcular_total(envio_titulo: any){
    this.total_pagar = parseFloat(this.subtotal.toString()) + parseFloat(this.precio_envio);
    this.venta.subtotal = this.total_pagar;
    this.venta.envio_precio = parseFloat(this.precio_envio);
    this.venta.envio_titulo = envio_titulo;
  }

  seleccionar_pago(formaPago: string){
    this.formaPago = formaPago;
  }

  confirmar_compra(){
    this.venta.detalles = this.dventa;
    this.venta.transaccion = '-';
    this._clienteService.registro_compra_cliente(this.venta, this.token).subscribe(
      response=>{
        this._router.navigate(['/cuenta/ordenes']);
      }
    )
  }

  pagoValido(){
    if(this.formaPago == 'card' && this.card_data.ncard && this.card_data.exp && this.card_data.cvc){
      return false;
    }else if(this.formaPago != 'card'){
      return false;
    }
    return true;
  }

}
