import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { GuestService } from 'src/app/services/guest.service';

declare var iziToast:any;
declare var $: any;

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  public url;
  public token;
  public detalles : Array<any> = [];
  public load_data = true;
  public id: any;
  public orden: any = {};
  public totalstar = 5;
  public review: any = {};
  public descuento_activo: any = undefined;

  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute,
    private _guestService: GuestService
  ) {
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];

        this.init_data();
      }
    );
  }

  ngOnInit(): void {
  }

  init_data(){
    this._clienteService.obtener_detalles_ordenes_cliente(this.id, this.token).subscribe(
      response=>{
        if(response.data != undefined){
          this.orden = response.data;
          response.detalles.forEach((element: { producto: { _id: any; }; estado: boolean; }) => {
            this._clienteService.obtener_review_producto_cliente(element.producto._id).subscribe(
              response=>{
                let reseña_emitida = false;

                response.data.forEach((element_: { cliente: string | null; }) => {
                  if(element_.cliente == localStorage.getItem('_id')){
                    reseña_emitida = true;
                  }
                });
                element.estado = reseña_emitida;
              }
            )
          });
          this.detalles = response.detalles;
          this.load_data = false;
        }else{
          this.orden = undefined;
        }
        
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
    )
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}){
    this.review.estrellas = $event.newValue;
  }

  openModal(item: any){
    this.review = {};
    this.review.producto = item.producto._id;
    this.review.cliente = item.cliente;
    this.review.venta = this.id;
  }

  emitir(id: any){
    if(this.review.review){
      if(this.review.estrellas && this.review.estrellas > 0){        
        this._clienteService.emitir_review_producto_cliente(this.review, this.token).subscribe(
          response=>{
            console.log(response);
            
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              position: 'topCenter',
              message: 'Reseña agregada correctamente'
            });

            $('#review-'+id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.init_data();
          }
        );
        
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          position: 'topCenter',
          message: 'Tienes que seleccionar el número de estrellas'
        });
      } 
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'Tienes que ingresar un mensaje en la reseña'
      });
    }
  }

}
