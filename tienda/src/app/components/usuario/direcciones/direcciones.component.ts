import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GuestService } from 'src/app/services/guest.service';

declare var $: any;
declare var iziToast:any;

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  public direccion: any = {
    pais: '',
    comunidad_autonoma: '',
    provincia: '',
    ciudad: '',
    principal: false,
  };
  public token;
  public ciudades: Array<any> = [];
  public provincias: Array<any> = [];
  public comunidades_autonomas: Array<any> = [];

  public ciudades_arr: Array<any> = [];
  public provincias_arr: Array<any> = [];
  public comunidades_autonomas_arr: Array<any> = [];

  public direcciones: Array<any> = [];
  public load_data = true;

  constructor(
    private _guestService: GuestService,
    private _clienteService: ClienteService
  ) {
    this.token = localStorage.getItem('token');

    this._guestService.get_comunidades_autonomas().subscribe(
      response=>{
        response.forEach((element: { id: any; name: any; }) => {
          this.comunidades_autonomas.push({
            id: element.id,
            name: element.name
          });
        });
      }
    );

    this._guestService.get_comunidades_autonomas().subscribe(
      response=>{
        this.comunidades_autonomas_arr = response;
      }
    );

    this._guestService.get_provincias().subscribe(
      response=>{
        this.provincias_arr = response;
      }
    );

    this._guestService.get_ciudades().subscribe(
      response=>{
        this.ciudades_arr = response;
      }
    );
  }

  ngOnInit(): void {
    this.obtener_direccion();
  }

  select_comunidad_autonoma(){
    this.provincias = [];
    $('#sl-provincia').prop('disabled', false);
    $('#sl-ciudad').prop('disabled', true);
    this.direccion.provincia = '';
    this.direccion.ciudad = '';
    this._guestService.get_provincias().subscribe(
      response=>{
        response.forEach((element: { id: any; name: any; comunity_id: any; }) => {
          if(element.comunity_id == this.direccion.comunidad_autonoma){
            this.provincias.push({
              id: element.id,
              name: element.name
            });
          }
        });
      }
    );
  }

  select_provincia(){
    this.ciudades = [];
    $('#sl-ciudad').prop('disabled', false);
    this.direccion.ciudad = '';
    this._guestService.get_ciudades().subscribe(
      response=>{
        response.forEach((element: { id: any; name: any; province_id: any }) => {
          if(element.province_id == this.direccion.provincia){
            this.ciudades.push({
              id: element.id,
              name: element.name
            });
          }
        });
      }
    );
  }

  registrar(registroForm: any){
    if(registroForm.valid){
      // Para pintar el nombre del país, comunidades, provincias y ciudades
      this.direccion.pais = 'España';

      this.comunidades_autonomas_arr.forEach(element=>{
        if(parseInt(element.id) == parseInt(this.direccion.comunidad_autonoma)){
          this.direccion.comunidad_autonoma = element.name;
        }
      })

      this.provincias_arr.forEach(element=>{
        if(parseInt(element.id) == parseInt(this.direccion.provincia)){
          this.direccion.provincia = element.name;
        }
      })

      this.ciudades_arr.forEach(element=>{
        if(parseInt(element.id) == parseInt(this.direccion.ciudad)){
          this.direccion.ciudad = element.name;
        }
      })
      
      let data = {
        destinatario: this.direccion.destinatario,
        dni: this.direccion.dni,
        cip: this.direccion.cip,
        direccion: this.direccion.direccion,
        telefono: this.direccion.telefono,
        pais: this.direccion.pais,
        comunidad_autonoma: this.direccion.comunidad_autonoma,
        provincia: this.direccion.provincia,
        ciudad: this.direccion.ciudad,
        principal: this.direccion.principal,
        cliente: localStorage.getItem('_id')
      };
      
      this._clienteService.registro_direccion_cliente(data, this.token).subscribe(
        response=>{
          this.direccion = {
            pais: '',
            comunidad_autonoma: '',
            provincia: '',
            ciudad: '',
            principal: false,
          };
          $('sl-comunidad_autonoma').prop('disabled', true);
          $('sl-provincia').prop('disabled', true);
          $('sl-ciudad').prop('disabled', true);

          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topCenter',
            message: 'Nueva dirección agregada correctamente'
          });
        }
      )
      this.obtener_direccion();
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topCenter',
        message: 'Datos incorrectos'
      });
    }
  }

  obtener_direccion(){
    this._clienteService.obtener_direccion_todos_cliente(localStorage.getItem('_id'), this.token).subscribe(
      response=>{
        this.direcciones = response.data;
        this.load_data = false;
      }
    )
  }

  establecer_principal(id: any){
    this._clienteService.cambiar_direccion_principal_cliente(id, localStorage.getItem('_id'), this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topCenter',
          message: 'Dirección principal actualizada correctamente'
        });
        this.obtener_direccion();
      }
    )
  }

}
