import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
