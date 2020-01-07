import { Component, OnInit, Input } from '@angular/core';
import { ServerApiService } from '../server-api.service';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent implements OnInit {

  @Input() data: any;
  @Input() symbol: string;

  shownData: any;

  translationLoading = false;

  selectedCountryCode = 'us';
  countriesLanguages = {
    us: 'en',
    de: 'de',
    pt: 'pt',
    es: 'es',
    fr: 'fr'
  };

  countryCodes = Object.keys(this.countriesLanguages);

  constructor(private api: ServerApiService) { }

  ngOnInit() {
    this.shownData = this.data;
  }

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
    this.translationLoading = true;

    this.api.getTranslation(this.symbol, this.data.guid.content, this.countriesLanguages[this.selectedCountryCode]).toPromise()
      .then((res: any) => {
        this.shownData.title = res.title;
        this.shownData.description = res.description;
        this.translationLoading = false;
      })
      .catch(err => console.error(err));

    setTimeout(() => {
      if (this.translationLoading) {
        this.translationLoading = false;
      }
    }, 10000);
  }

}
