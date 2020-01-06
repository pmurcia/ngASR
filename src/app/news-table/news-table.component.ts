import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbViewportRulerAdapter, NbDialogRef, NbDialogService } from '@nebular/theme';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { R3TargetBinder } from '@angular/compiler';

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
export class NewsTableComponent implements OnInit {
  @Input() symbol: string;

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
        link: 'https://finance.yahoo.com/m/56ea6664-ec7d-3bc2-b550-082832aa3313/top-3-mutual-funds-that-hold.html?.tsrc\u003drss',
        // tslint:disable-next-line: max-line-length
        description: 'The top three mutual fund holders of Alphabet Inc. (GOOG/GOOGL) stock include the Vanguard Total Stock Market Index Fund, Vanguard 500 Index Fund, and the American Funds Growth Fund of America.  Together, the mutual funds own more than 5% of Alphabet\u0027s outstanding shares.  Alphabet became the parent holding company for Google on October 2, 2015.',
        guid: {
          isPermaLink: false,
          content: '56ea6664-ec7d-3bc2-b550-082832aa3313'
        },
        title: 'Top 3 Mutual Funds that Hold Google Stock',
        pubDate: new Date('Jan 5, 2020, 3:55:27 PM'),
        score: -0.353265
      }
    },
    {
      data: {
        link: 'https://finance.yahoo.com/m/e2fa9bbd-bf49-3284-8c5d-f194f6ee9a00/investors-are-misplacing.html?.tsrc\u003drss',
        description: 'Imported oil has significantly less effect on the American economy than it did only a few years ago.',
        guid: {
          isPermaLink: false,
          content: 'e2fa9bbd-bf49-3284-8c5d-f194f6ee9a00'
        },
        title: 'Investors are misplacing threats to the U.S. stock market',
        pubDate: new Date('Jan 4, 2020, 5:18:00 PM'),
        score: 0.00025695
      }
    },
    {
      data: {
        link: 'https://finance.yahoo.com/news/apple-shares-end-years-discount-150000043.html?.tsrc\u003drss',
        // tslint:disable-next-line: max-line-length
        description: '(Bloomberg) -- Apple Inc. has gotten little respect from equity investors. Until now.For the first time since 2011, shares of the iPhone maker have traded at a higher price-earnings ratio than the S\u0026P 500 for months amid a year that saw the stock?s valuation almost double. It?s a reversal from the previous nine years, when concerns over a lack of product innovation kept the stock at a persistent discount to the market.Credit the shift in sentiment to Apple?s focus on tapping an ecosystem of nearly 1.5 billion users to generate a steady stream of profit. The increasing contribution from services like iCloud storage and Apple Music is making its business more stable and therefore deserving of a higher multiple, according to Gene Munster, a long-time Apple analyst and founder of Loup Ventures.?Investors are slowly getting more comfortable with the concept that a company that has a combination of software, hardware and services can be a dependable business,? Munster said.Indeed, going by analyst estimates, Apple?s earnings are poised to increase every quarter over the next three years. Such a streak of uninterrupted growth hasn?t occurred since 2012, data compiled by Bloomberg show. Profits will jump 10% in fiscal 2020 and maintain that pace of growth during the next two years.The prospect of steady growth is one reason that investors are willing to pay up for Apple shares even after its earnings fell two quarters in a row last year. After an 86% gain in 2019, the stock is trading at 25 times last year?s earnings, the highest level since 2008. That compares with a multiple of 21.7 for the S\u0026P 500.The rally has helped Apple close the gap with tech giants such as Facebook Inc. But it still trails Alphabet Inc. at 31 times earnings in the past 12 months and Microsoft Corp. at 32. Munster predicts Apple?s multiple will continue to rise as more investors embrace the company?s expansion beyond smartphones.Software companies typically command higher multiples because customers commit to purchase services for longer periods of time, making sales more predictable. Apple bulls argue its vast user base provides a similar recurring revenue stream.The magnitude of Apple?s rally in 2019 has raised concern that the stock is due for a pullback. Seven of the 49 analysts tracked by Bloomberg that cover Apple have sell ratings, the most in at least nine years. At Friday?s close, the stock was already 10% above the average Wall Street price target.Apple?s continued reliance on iPhones for at least half its revenue is one bearish argument. Price tags of as much as $1,000 or more make the company vulnerable to economic slowdowns. Profit fell in 2016 and again in the middle of last year partly because of weakening demand in China.The share of revenue generated by the iPhone has been shrinking in recent years, though, the result of slowing smartphone sales and the ever-expanding portfolio of services. In addition to mainstays such as the App Store and AppleCare subscriptions, the company has debuted the TV+ streaming service along with Arcade video game subscriptions.Services revenue is expected to rise to $54 billion in fiscal 2020 and account for a fifth of the company?s total sales, up from 18% at the end of 2019, according to analyst data compiled by Bloomberg.Apple?s services and the success of wearables like AirPods and the Apple Watch are making investors more comfortable paying up for the stock, according to Kevin Walkush, a portfolio manager at Jensen Investment Management Inc., which owns Apple shares.?The services business has really moved forward? and wearables ?have really strong growth,? he said in an interview. ?If you step back, you see all these different opportunities to grow but also to increase their ecosystem and the stickiness of that ecosystem due to services.?\u0026#92;--With assistance from Mark Gurman.To contact the reporter on this story: Jeran Wittenstein in San Francisco at jwittenstei1@bloomberg.netTo contact the editors responsible for this story: Catherine Larkin at clarkin4@bloomberg.net, Lu WangFor more articles like this, please visit us at bloomberg.com©2020 Bloomberg L.P.',
        guid: {
          isPermaLink: false,
          content: 'c128d8ef-c4d1-3bea-ad2e-33978c7181fd'
        },
        title: 'Apple Shares End Years of Discount as Earnings Risk Seen Waning',
        pubDate: new Date('Jan 4, 2020, 4:00:00 PM'),
        score: 0.948256
      },
    }
  ];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private dialogService: NbDialogService) {
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

  articleClicked(object: any) {
    this.dialogService.open(ArticleModalComponent, {
      context: {
        data: object
      }
    });
  }

  getColorFromScore(score: number) {
    const redComponent = score < 0 ? Math.round(-255 * score) : 0;
    const greenComponent = score >= 0 ? Math.round(255 * score) : 0;

    // const redComponent = Math.round(255 / 2 * (1 - score));
    // const greenComponent = Math.round(255 / 2 * score);

    return `rgb(${ redComponent },${ greenComponent },0)`;
  }
}
