import { Component, OnInit, ViewChild } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbMenuService, NbPopoverDirective } from '@nebular/theme';
import { NgForm } from '@angular/forms';

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
          icon: 'chevron-right',
          link: `/${symbolObj.acronym}`,
        }
      ], 'sidebar-menu');

    this.popover.hide();
  }
}
