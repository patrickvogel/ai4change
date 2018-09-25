import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../services/selection.service';
import { ForecastService } from '../services/forecast.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public chartType = 'line';
  public stockCodes = [];
  public stockCodesStr = '';

  products;
  forecast;

  constructor(private selectionService: SelectionService, private forecastService: ForecastService) {
    this.selectionService.getSelection()
         .subscribe(products => {
          this.products = products;

          this.forecastService.getForecast(products).subscribe(forecast => {
              this.forecast = forecast.predictions;
              this.updateCharts();
          });

         });
   }

   updateCharts() {

       for(let i = 0; i < this.products.length; i++) {
        const ctx = document.getElementById('chart' + i).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.products[i].forecastLabels,
                datasets: [{
                    label: this.products[i].id + ': ' + this.products[i].name,
                    data: this.products[i].amounts.concat(this.forecast[i].mean),
                    backgroundColor: [
                        'rgb(43, 187, 173)',
                        'rgb(43, 187, 173)',
                        'rgb(43, 187, 173)',
                        'rgb(136, 14, 79)',
                        'rgb(136, 14, 79)',
                        'rgb(136, 14, 79)',
                        'rgb(136, 14, 79)'
                    ]
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false
                 }
            }
        });
       }
   }

  ngOnInit() {
  }
}
