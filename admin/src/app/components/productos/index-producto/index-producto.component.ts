import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
import { Workbook } from "exceljs";
import * as fs from 'file-saver';
import { GuestService } from 'src/app/services/guest.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public load_data = true;
  public filtro = '';
  public token;
  public productos: Array<any> = [];
  public arr_productos: Array<any> = [];
  public url: any;
  public page = 1;
  public pageSize = 4;
  public load_btn = false;
  public descuento_activo: any = undefined;

  constructor(
    private _productoService: ProductoService,
    private _guestService: GuestService
  ) {

    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    
   }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._productoService.listar_productos_filtro_admin(this.filtro, this.token).subscribe(
      response=>{
        console.log(response);
        this.productos = response.data;
        this.productos.forEach(element=>{
          this.arr_productos.push({
            titulo: element.titulo,
            stock: element.stock,
            precio: element.precio,
            categoria: element.categoria,
            nventas: element.nventas
          });
        });
        console.log(this.arr_productos);
        
        this.load_data = false;
      },
      error=>{
        console.log(error);
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

  filtrar(){
    if(this.filtro){
      this._productoService.listar_productos_filtro_admin(this.filtro, this.token).subscribe(
        response=>{
          console.log(response);
          this.productos = response.data;
          this.load_data = false;
        },
        error=>{
          console.log(error);
        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'Introduzca el filtro que desee buscar'
      });
    }
  }

  resetear(){
    this.filtro = '';
    this.init_data();
  }

  eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_producto_admin(id, this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topCenter',
          message: 'Producto eliminado correctamente'
        });

        // Para cerrar la ventana modal
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;

        // Nos vuelve a listar los clientes ya actualizados
        this.init_data();
      },
      error=>{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          position: 'topCenter',
          message: 'Error en el servidor'
        });
        console.log(error);
        this.load_btn = false;

      }
    )
  }

  download_excel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.arr_productos){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30},
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Categoria', key: 'col4', width: 25},
      { header: 'N° ventas', key: 'col5', width: 15},
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

  

}    
