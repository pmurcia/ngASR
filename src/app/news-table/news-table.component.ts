import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbViewportRulerAdapter } from '@nebular/theme';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  pubDate: Date;
  title: string;
  score: number;
  link?: string;
}

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnInit {
  symbol: string;

  allColumns = ['pubDate', 'title', 'score'];
  allColumnHeaders = {
    pubDate: 'Publication Date',
    title: 'Title',
    score: 'Score'
  };

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  private data: TreeNode<FSEntry>[] = [
    {
      data: {
        pubDate: new Date('Jan 5, 2020, 3:55:27 PM'),
        title: 'Top 3 Mutual Funds that Hold Google Stock',
        score: 0.790429
      }
    },
    {
      data: {
        pubDate: new Date('Jan 6, 2020, 3:55:27 PM'),
        title: 'Top 2 Mutual Funds that Hold Google Stock',
        score: -0.790429
      }
    },
    {
      data: {
        pubDate: new Date('Jan 7, 2020, 3:55:27 PM'),
        title: 'Top 1 Mutual Funds that Hold Google Stock',
        score: 0.005
      }
    }
  ];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit() {
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

}
