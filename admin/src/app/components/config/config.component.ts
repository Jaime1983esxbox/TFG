import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast:any;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token;
  public config: any = {};
  public url;

  public titulo_cat = '';
  public icono_cat = '';
  public file: any = undefined;
  public imgSelect: any | ArrayBuffer;
  public load_btn_eliminar = false;

  constructor(
    private _adminService: AdminService
  ) {

    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url; 
    this._adminService.obtener_config_admin(this.token).subscribe(
      response=>{
        this.config = response.data;
        this.imgSelect = this.url + 'obtener_logo/' + this.config.logo;
        console.log(this.config);
        
      },
      error=>{
        console.log(error);
        
      }
    )
   }

  ngOnInit(): void {
  }

  agregar_cat(){
    if(this.titulo_cat && this.icono_cat){
      console.log(uuidv4());
      
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        // Creamos un identificador único para el título e icono para poder verificar
        // con el módulo externo uuidv4
        _id: uuidv4()
      });

      this.titulo_cat = '';
      this.icono_cat = '';
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'Debe ingresar un título de icono para la categoría'
      });  
    }
  }

  actualizar(configForm: any){
    if(configForm.valid){
      let data = {
        titulo: configForm.value.titulo,
        serie: configForm.value.serie,
        correlativo: configForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      }

      console.log(data);

      this._adminService.actualizar_config_admin("615c9331c6e43a6d6c9bfe9d", data, this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topCenter',
            message: 'Configuración actualizada correctamente'
          });
          
        },
        error=>{

        }
      )
      
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'Complete correctamente el formulario'
      });  
    }
  }

  fileChangeEvent(event: any){
    var file: any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'No hay una imagen para enviar'
      });
    }

    if(file.size <= 4000000){
      if(file.type == 'image/png' ||
        file.type == 'image/webp' || 
        file.type == 'image/jpg' || 
        file.type == 'image/gif' || 
        file.type == 'image/jpeg'){

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        reader.readAsDataURL(file); 
        $('#input-portada').text(file.name);
        this.file = file;

      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          position: 'topCenter',
          message: 'El archivo tiene que ser una imagen'
        });

        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg'
        this.file = undefined;
      }

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'La imagen no puede superar los 4MB'
      });

      $('#input-portada').text('Selecionar imagen');
      this.imgSelect = 'assets/img/01.jpg'
      this.file = undefined;
    }
    console.log(this.file)
  }

  // Va a cargar la previsualización de la imagen y actualizarla
  ngDoCheck():void{
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">"); 
  }

  eliminar_categoria(idx:any){
    this.config.categorias.splice(idx,1);

    $('#delete-'+idx).modal('hide');
    $('.modal-backdrop').removeClass('show');

    this.load_btn_eliminar = false;
  }
}
