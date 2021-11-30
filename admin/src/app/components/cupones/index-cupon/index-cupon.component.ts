import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast:any;
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public load_data = true;
  public page = 1;
  public pageSize = 4;
  public cupones: Array<any> = [];
  public filtro = '';
  public token;

  constructor(
    private _cuponService: CuponService
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
      response=>{
        this.cupones = response.data;
        this.load_data = false;
      }
    )
  }

  filtrar(){
    this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
      response=>{
        this.cupones = response.data;
        this.load_data = false;
      }
    )
  }
  
  eliminar(id: any){
    this._cuponService.eliminar_cupon_admin(id, this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topCenter',
          message: 'Cupón eliminado correctamente'
        });

        // Para cerrar la ventana modal
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        // Nos vuelve a listar los clientes ya actualizados
        this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
          response=>{
            this.cupones = response.data;
            this.load_data = false;
          }
        )
      },
      error=>{
        console.log(error);
      }
    )
  }

  resetear(){
    this.filtro = '';
    this.init_data();
  }

}
