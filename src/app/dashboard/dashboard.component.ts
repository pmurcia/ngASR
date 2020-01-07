import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbMenuService, NbPopoverDirective } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, UrlSegment, NavigationEnd } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ServerApiService } from '../server-api.service';

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
  data: any;

  panelLoading = false;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private router: Router,
              private route: ActivatedRoute,
              private api: ServerApiService) {}

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
        paths => {
          this.symbol = paths[0].path;
          console.log(this.symbol);
          this.changeData(this.symbol);
        },
        err => this.symbol = null
      );
      this.sidebarService.expand();
    });
  }

  changeData(symbol: string) {
    this.panelLoading = true;
    this.api.getData(symbol).toPromise().then(data => {
      this.data = data;
      this.panelLoading = false;
    }).catch(err => console.error(err));

    setTimeout(() => this.panelLoading = false, 5000);
  }
}
