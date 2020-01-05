import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule, NbSidebarModule, NbLayoutModule, NbMenuModule, NbButtonModule, NbPopoverModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent
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
    FormsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
