import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../services/selection.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public chartType = 'bar';
  public stockCodes = [];
  public stockCodesStr = '';

  public chartDatasets: Array<any> = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset'}
  ];

  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  public chartColors: Array<any> = [
      {
          backgroundColor: 'rgba(220,220,220,0.2)',
          borderColor: 'rgba(220,220,220,1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(220,220,220,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(220,220,220,1)'
      },
      {
          backgroundColor: 'rgba(151,187,205,0.2)',
          borderColor: 'rgba(151,187,205,1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(151,187,205,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(151,187,205,1)'
      }
  ];

  public chartOptions: any = {
      responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  constructor(private selectionService: SelectionService) {
    this.selectionService.getSelection()
         .subscribe(stockCodes => {
          console.log('neue StockCodes');
            this.stockCodes = stockCodes;
            this.stockCodesStr = stockCodes.join();
            console.log(stockCodes);
         });
   }

  ngOnInit() {
  }
}
