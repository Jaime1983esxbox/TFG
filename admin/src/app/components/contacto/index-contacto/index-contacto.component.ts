import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent implements OnInit {

  public load_data = true;
  public page = 1;
  public pageSize = 4;
  public mensajes: Array<any> = [];
  public filtro = '';
  public token;
  public load_btn = false;

  constructor(
    private _adminService: AdminService
  ) {
    this.token = localStorage.getItem('token');
    this.load_data = false;
   }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._adminService.obtener_mensajes_admin(this.token).subscribe(
      response=>{
        this.mensajes = response.data;
        this.load_data = false;
      }
    )
  }

  cerrar(id:any){
    this.load_btn = true;
    this._adminService.cerrar_mensaje_admin(id, {data:undefined}, this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topCenter',
          message: 'Mensaje cerrado correctamente'
        });

        $('#estadoModal-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_data();
        this.load_btn = false;
      },
      error=>{
        console.log(error);
      }
    )
  }
}
