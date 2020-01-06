import { Component, OnInit, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit {

  protected chart: Chart;
  @Input() symbol: string;
  stockData: any;
  stockLoading = false;

  constructor() { }

  ngOnInit() {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: this.symbol,
          backgroundColor: '#3366ff',
          borderColor: '#3366ff',
          data: [
            1,
            49,
            4,
            36,
            9,
            25,
            16
          ],
          fill: false,
        }]
      },
      options: {
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    };

    this.chart = new Chart('realtime', config);
  }

  refreshStock() {
    this.stockLoading = true;
    setTimeout(() => {
      this.stockLoading = false;
    }, 5000);
  }

}
