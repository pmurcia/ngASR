import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule, NbSidebarModule, NbLayoutModule, NbMenuModule, NbButtonModule, NbPopoverModule, NbCardModule, NbTreeGridModule, NbDialogModule, NbDialogConfig } from '@nebular/theme';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { MainPanelComponent } from '../main-panel/main-panel.component';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import { NewsTableComponent } from '../news-table/news-table.component';
import { ArticleModalComponent } from '../article-modal/article-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainPanelComponent,
    StockChartComponent,
    NewsTableComponent,
    ArticleModalComponent
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
    NbDialogModule.forChild()
  ],
  exports: [
    DashboardComponent
  ],
  entryComponents: [
    ArticleModalComponent
  ]
})
export class DashboardModule { }
