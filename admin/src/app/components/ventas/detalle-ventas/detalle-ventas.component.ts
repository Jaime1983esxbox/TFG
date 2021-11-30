import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent implements OnInit {

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
    private _route: ActivatedRoute,
    private _adminService: AdminService,
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
    this._adminService.obtener_detalles_ordenes_cliente(this.id, this.token).subscribe(
      response=>{
        if(response.data != undefined){
          this.orden = response.data;

          this.detalles = response.detalles;
          this.load_data = false;
        }else{
          this.orden = undefined;
        }

        console.log(this.detalles);
        
      }
    )

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

}
