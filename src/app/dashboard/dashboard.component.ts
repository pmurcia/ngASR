import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbMenuService } from '@nebular/theme';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  collapsed = false;

  inputSymbol: any;

  items: NbMenuItem[] = [
    {
      title: 'Google',
      icon: 'google',
      link: '/GOOGL',
    },
    {
      title: 'Facebook',
      icon: 'facebook',
      link: '/FB',
    },
  ];

  constructor(private sidebarService: NbSidebarService, private menuService: NbMenuService) { }

  ngOnInit() {
    this.sidebarService.expand();
  }

  toggle() {
    this.sidebarService.toggle(true);
    this.collapsed = !this.collapsed;
    return false;
  }

  addSymbol(symbol: NgForm) {
    const symbolObj = symbol.value;
    this.menuService.addItems(
      [
        {
          title: `${symbolObj.name}`,
          icon: 'plus-outline',
          link: `/${symbolObj.acronym}`,
        }
      ], 'sidebar-menu');
  }

}
