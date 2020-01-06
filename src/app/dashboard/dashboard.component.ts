import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbMenuService, NbPopoverDirective } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;

  collapsed = false;

  inputSymbol: any;
  items: NbMenuItem[] = [];

  symbol: string;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  toggle() {
    this.sidebarService.toggle(true);
    this.collapsed = !this.collapsed;
    return false;
  }

  addSymbol(symbol: NgForm) {
    const symbolObj = symbol.value;
    const symbolUrl = `/${symbolObj.acronym}`;
    this.menuService.addItems(
      [
        {
          title: `${symbolObj.name}`,
          icon: 'chevron-right',
          link: symbolUrl,
        }
      ], 'sidebar-menu');

    this.popover.hide();
    this.router.navigateByUrl(symbolUrl).then(val => {
      this.route.url.subscribe(
        paths => this.symbol = paths[0].path,
        err => this.symbol = null
      );
      this.sidebarService.expand();
    });
  }
}
