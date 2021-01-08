import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: 'mercado',
    component: StockComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [StockComponent],
})
export class FinalUserStockModule {}
