import { Component, OnInit, Input, TemplateRef, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService } from '@nebular/theme';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { ServerApiService } from '../server-api.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  pubDate: Date;
  title: string;
  score?: number;
  link: string;
  description: string;
  guid: any;
}

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnInit, OnChanges {
  @Input() symbol: string;
  @Input() defaultData: any;

  newsData: any;

  newsLoading = false;
  scoreLoading = false;

  allColumns = ['pubDate', 'title', 'score'];
  allColumnHeaders = {
    pubDate: 'Publication Date',
    title: 'Title',
    score: 'Score'
  };

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  protected data: TreeNode<FSEntry>[];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private dialogService: NbDialogService,
              private api: ServerApiService) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const newData = changes.defaultData.currentValue;
    if (newData != null) {
      this.data = newData.map((d: any) => {
        d.pubDate = new Date(d.pubDate);
        return { data: d };
      });
      this.dataSource = this.dataSourceBuilder.create(this.data);
    }
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  articleClicked(object: any) {
    this.dialogService.open(ArticleModalComponent, {
      context: {
        data: object,
        symbol: this.symbol
      }
    });
  }

  getColorFromScore(score: number) {
    const redComponent = score > 0 ? Math.round(255 * (1 - score)) : 255;
    const greenComponent = Math.round(170 + 76.5 * score - 32.5 * Math.pow(score, 2));
    const blueComponent = Math.round(15 * score + 128 * Math.pow(score, 2));

    return `rgb(${ redComponent },${ greenComponent },${ blueComponent })`;
  }

  refreshNews() {
    this.newsLoading = true;
    this.api.getNews(this.symbol).toPromise().then((data: any) => {
      this.data = data.map((d: any) => {
        d.pubDate = new Date(d.pubDate);
        return { data: d };
      });
      this.dataSource = this.dataSourceBuilder.create(this.data);
      this.newsLoading = false;
    })
    .catch(err => console.error(err));

    setTimeout(() => this.newsLoading = false, 5000);
  }

  refreshScore(row: any) {
    this.scoreLoading = true;
    const res = this.api.getScore(this.symbol, row.guid.content).toPromise()
    .then((r: any) => {
      this.data = this.data.map((article: any) => {
        if (row.guid.content === article.data.guid.content) {
          article.data.score = r.sentiment.document.score;
        }

        return article;
      });

      this.dataSource = this.dataSourceBuilder.create(this.data);
      this.scoreLoading = false;
    })
    .catch(err => console.error(err));

    setTimeout(() => this.scoreLoading = false, 10000);
  }
}
