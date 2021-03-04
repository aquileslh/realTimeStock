import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockListComponent } from './stock-list/stock-list.component';
import { GetInformationComponent } from './get-information/get-information.component';

const routes: Routes = [
  {
    path: '',
    component: StockListComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [StockListComponent, GetInformationComponent],
})
export class AdminStockListModule {}
