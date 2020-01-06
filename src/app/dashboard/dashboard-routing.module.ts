import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPanelComponent } from '../main-panel/main-panel.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  // {
  //   path: ':symbol',
  //   component: MainPanelComponent,
  // },
  // {
  //   path: '',
  //   component: DashboardComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
