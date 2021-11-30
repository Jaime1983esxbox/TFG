import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-index-review',
  templateUrl: './index-review.component.html',
  styleUrls: ['./index-review.component.css']
})
export class IndexReviewComponent implements OnInit {

  public load_data = true;
  public reviews: Array<any> = [];
  public token;
  public url;
  public page = 1;
  public pageSize = 6;

  constructor(
    private _clienteService: ClienteService,
    private _guestService: GuestService
  ) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._clienteService.obtener_reviews_cliente(localStorage.getItem('_id'),this.token).subscribe(
      response=>{
        console.log(response);
        this.reviews = response.data;
        this.load_data = false;
        this.reviews.forEach(element => {
          this._guestService.obtener_productos_id_publico(element.producto).subscribe(
            response=>{
              element.producto = response.data;
            }
          )
        });
      }
    )

  }

}
