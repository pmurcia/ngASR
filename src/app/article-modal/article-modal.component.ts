import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent implements OnInit {

  @Input() data: any;
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

  constructor() { }

  ngOnInit() {
  }

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
    this.translationLoading = true;
    setTimeout(() => {
      this.translationLoading = false;
    }, 5000);
  }

}
