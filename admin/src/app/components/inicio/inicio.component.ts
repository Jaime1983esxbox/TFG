import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @ViewChild('myChart') myChart: ElementRef;

  public token;
  public chart: any;
  public total_ganancia = 0;
  public total_month = 0;
  public count_ventas = 0;
  public total_previous_month = 0;

  constructor(
    private _adminService: AdminService
  ) {
    this.token = localStorage.getItem('token');
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.init_data();
    
  }

  init_data(){
    this._adminService.kpi_ganancias_mensuales_admin(this.token).subscribe(
      response=>{
        this.total_ganancia = response.total_ganancia;
        this.total_month = response.total_month;
        this.count_ventas = response.count_ventas;
        this.total_previous_month = response.total_previous_month;
        const canvas = this.myChart.nativeElement.getContext("2d");
        this.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                    label: 'Meses',
                    data: [response.enero,
                      response.febrero,
                      response.marzo,
                      response.abril,
                      response.mayo,
                      response.junio,
                      response.julio,
                      response.agosto,
                      response.septiembre,
                      response.octubre,
                      response.noviembre,
                      response.diciembre],
                    backgroundColor:'transparent',
                    borderColor: 'red',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
      }
    );
  }

}
