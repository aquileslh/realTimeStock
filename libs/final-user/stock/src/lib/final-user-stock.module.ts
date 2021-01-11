import { CompanyProfileModule } from '@grillo-software/company-profile';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: '',
    component: StockComponent
  }
];

@NgModule({
  imports: [CommonModule, CompanyProfileModule,  RouterModule.forChild(routes)],
  declarations: [StockComponent],
})
export class FinalUserStockModule {}
