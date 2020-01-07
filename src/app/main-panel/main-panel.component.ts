import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ServerApiService } from '../server-api.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit, OnChanges {

  @Input() defaultData: any;
  data: string;
  symbol: string;
  stockDefault: any;
  newsDefault: any;

  constructor(private api: ServerApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const newData = changes.defaultData.currentValue;
    if (newData != null) {
      this.symbol = newData.symbolId;
      this.stockDefault = newData.stock;
      this.newsDefault = newData.news;
    }
  }
}
