import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbIconModule,
  NbSidebarModule,
  NbLayoutModule,
  NbMenuModule,
  NbButtonModule,
  NbPopoverModule,
  NbCardModule,
  NbTreeGridModule,
  NbDialogModule,
  NbSpinnerModule
} from '@nebular/theme';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { MainPanelComponent } from '../main-panel/main-panel.component';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { NewsTableComponent } from '../news-table/news-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainPanelComponent,
    StockChartComponent,
    ArticleModalComponent,
    NewsTableComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    NbSidebarModule,
    NbLayoutModule,
    NbMenuModule,
    DashboardRoutingModule,
    NbButtonModule,
    NbPopoverModule,
    FormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbDialogModule.forChild(),
    NgxFlagPickerModule,
    NbSpinnerModule
  ],
  exports: [
    DashboardComponent
  ],
  entryComponents: [
    ArticleModalComponent
  ]
})
export class DashboardModule { }
