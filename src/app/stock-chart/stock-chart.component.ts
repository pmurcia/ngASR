import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ServerApiService } from '../server-api.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit, OnChanges {

  protected chart: Chart;
  @Input() symbol: string;
  @Input() defaultData: any;
  stockData: any;
  stockLoading = false;
  config: ChartConfiguration;

  constructor(private api: ServerApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const newData = changes.defaultData.currentValue;
    if (newData != null) {
      console.log(newData);
      this.stockData = this.parseStockData(newData);
      this.updateChart();
    }
  }

  refreshStock() {
    this.stockLoading = true;
    this.api.getStock(this.symbol).toPromise().then(data => {
      this.stockData = this.parseStockData(data);
      this.updateChart();
      this.stockLoading = false;
    })
    .catch(err => console.error(err));

    setTimeout(() => this.stockLoading = false, 5000);
  }

  updateChart() {
    const dataLabels = this.stockData.map((d: any) => d.t);
    const dataValues = this.stockData.map((d: any) => d.y);

    this.config = {
      data: {
        labels: dataLabels,
        datasets: [{
          label: this.symbol,
          backgroundColor: '#3366ff',
          borderColor: '#3366ff',
          data: dataValues,
          fill: false,
          type: 'line',
          pointRadius: 0,
          lineTension: 0
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
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'day'
            },
            display: true,
            ticks: {
              source: 'auto'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Closing price ($)'
            }
          }]
        },
      }
    };

    this.chart = new Chart('realtime', this.config);
  }

  parseStockData(data: any) {
    const parsedData = data.map((d: any) => {
      return {
        t: new Date(d.date),
        y: d.close
      };
    });

    return parsedData;
  }

}
