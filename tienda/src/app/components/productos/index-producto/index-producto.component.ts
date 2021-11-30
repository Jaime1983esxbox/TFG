import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';

declare var iziToast:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public config_global: any = {};
  public filter_categoria = '';
  public productos: Array<any> = [];
  public filter_producto = '';
  public filter_cat_productos = 'todos';
  public load_data = true;
  public url;
  public route_categoria: any;
  public page = 1;
  public pageSize = 6;
  public sort_by = 'Defecto';
  public carrito_data: any = {
    variedad: '',
    cantidad: 1
  };
  public btn_cart = false;
  public token;
  public socket = io('http://localhost:4201');
  public descuento_activo: any = undefined;
  public indice_seleccionado: number = -1;
  public slug: any;
  public producto: any = {};
  public reviews: Array<any> = [];

  public total_puntos = 0;
  public max_puntos = 0;
  public porcent_raiting = 0;
  public points_raiting = 0;

  public count_five_start = 0;
  public count_four_start = 0;
  public count_three_start = 0;
  public count_two_start = 0;
  public count_one_start = 0;

  public five_porcent = 0;
  public four_porcent = 0;
  public three_porcent = 0;
  public two_porcent = 0;
  public one_porcent = 0;


  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute,
    private _guestService: GuestService
  ) {
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
    this._clienteService.obtener_config_publico().subscribe(
      response=>{
        this.config_global = response.data;
      }
    )

    this._route.params.subscribe(
      params=>{
        this.slug = params['slug'];
        
        this._guestService.obtener_productos_slug_publico(this.slug).subscribe(
          response=>{
            this.producto = response.data;
            console.log(this.producto);
            
            this._guestService.obtener_reviews_producto_publico(this.producto._id).subscribe(
              response=>{
                response.data.forEach((element: { estrellas: number; }) => {
                  if(element.estrellas == 5){
                    this.count_five_start = this.count_five_start + 1;
                  }else if(element.estrellas == 4){
                    this.count_four_start = this.count_four_start + 1;
                  }else if(element.estrellas == 3){
                    this.count_three_start = this.count_three_start + 1;
                  }else if(element.estrellas == 2){
                    this.count_two_start = this.count_two_start + 1;
                  }else if(element.estrellas == 1){
                    this.count_one_start = this.count_one_start + 1;
                  }

                  this.five_porcent = (this.count_five_start*100)/response.data.length;
                  this.four_porcent = (this.count_four_start*100)/response.data.length;
                  this.three_porcent = (this.count_three_start*100)/response.data.length;
                  this.two_porcent = (this.count_two_start*100)/response.data.length;
                  this.one_porcent = (this.count_one_start*100)/response.data.length;

                  let puntos_cinco = 0;
                  let puntos_cuatro = 0;
                  let puntos_tres = 0;
                  let puntos_dos = 0;
                  let puntos_uno = 0;

                  puntos_cinco = this.count_five_start * 5;
                  puntos_cuatro = this.count_four_start * 4;
                  puntos_tres = this.count_three_start * 3;
                  puntos_dos = this.count_two_start * 2;
                  puntos_uno = this.count_one_start * 1;

                  this.total_puntos = puntos_cinco + puntos_cuatro + puntos_tres + puntos_dos + puntos_uno;
                  
                  this.max_puntos = response.data.length * 5;
                  
                  this.porcent_raiting = (this.total_puntos*100)/this.max_puntos;

                  this.points_raiting = (this.porcent_raiting*5)/100;
                  console.log(this.points_raiting);
                  
                });

                this.reviews = response.data;
              }
            );
          }
        )
        this.route_categoria = params['categoria'];
        if(this.route_categoria){
          this._clienteService.listar_productos_publico('').subscribe(
            response=>{
              this.productos = response.data;
              this.productos = this.productos.filter(item=>item.categoria.toLowerCase() == this.route_categoria);
              this.load_data = false;
            }
          );
        }else{
          this._clienteService.listar_productos_publico('').subscribe(
            response=>{
              this.productos = response.data;
              this.load_data = false;
            }
          );
        }
        
      }
    )

   
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
  }

  buscar_categorias(){
    if(this.filter_categoria){
      var search = new RegExp(this.filter_categoria, 'i');
      this.config_global.categorias = this.config_global.categorias.filter(
        (item: any) =>search.test(item.titulo)
      );
    }else{
      this._clienteService.obtener_config_publico().subscribe(
        response=>{
          this.config_global = response.data;
        }
      );  
    }
  }

  buscar_producto(){
    this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
      response=>{
        this.productos = response.data;
        this.load_data = false;
      }
    )
  }

  buscar_por_categoria(indice: number){
    this.indice_seleccionado = indice;
    if(this.filter_cat_productos == 'todos'){
      this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
        response=>{
          this.productos = response.data;
          this.load_data = false;
        }
      )
    }else{
      this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
        response=>{
          this.productos = response.data;
          this.productos = this.productos.filter(item=>item.categoria == this.filter_cat_productos);
          this.load_data = false;
        }
      );
    }
  }

  reset_productos(){
    this.filter_producto = '';
    this._clienteService.listar_productos_publico('').subscribe(
      response=>{
        this.productos = response.data;
        this.load_data = false;
      }
    );
  }

  orden_por(){
    if(this.sort_by == 'Defecto'){
      this._clienteService.listar_productos_publico('').subscribe(
        response=>{
          this.productos = response.data;
          this.load_data = false;
        }
      );
    }else if(this.sort_by == 'Popularidad'){
      this.productos.sort(function (a,b){
        if(a.nventas < b.nventas){
          return 1;
        }
        if(a.nventas > b.nventas){
          return -1;
        }
        return 0;
      });
    }else if(this.sort_by == '+-Precio'){
      this.productos.sort(function (a,b){
        if(a.precio < b.precio){
          return 1;
        }
        if(a.precio > b.precio){
          return -1;
        }
        return 0;
      });
    }else if(this.sort_by == '-+Precio'){
      this.productos.sort(function (a,b){
        if(a.precio > b.precio){
          return 1;
        }
        if(a.precio < b.precio){
          return -1;
        }
        return 0;
      });
    }else if(this.sort_by == 'azTitulo'){
      this.productos.sort(function (a,b){
        if(a.titulo > b.titulo){
          return 1;
        }
        if(a.titulo < b.titulo){
          return -1;
        }
        return 0;
      });
    }else if(this.sort_by == 'zaTitulo'){
      this.productos.sort(function (a,b){
        if(a.titulo < b.titulo){
          return 1;
        }
        if(a.titulo > b.titulo){
          return -1;
        }
        return 0;
      });
    }    
  }

  agregar_producto(producto: any){
    let data = {
      producto: producto._id,
      cliente: localStorage.getItem('_id'),
      cantidad: 1,
      variedad: producto.variedades[0].titulo,
    }
    this.btn_cart = true;
    this._clienteService.agregar_carrito_cliente(data, this.token).subscribe(
      response=>{
        if(response.data == undefined){
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            position: 'topCenter',
            message: 'El producto ya está en el carrito'
          });
          this.btn_cart = false;
        }else{
          console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topCenter',
            message: 'Producto agregado al carrito correctamente'
          });
          this.socket.emit('add-carrito-add', {data:true});
          this.btn_cart = false;
        }
      }
    )
  }
  
}  