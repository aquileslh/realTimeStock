import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedSharedComponentModule } from '@grillo-software/shared/shared-component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedSharedComponentModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StockComponent],
})
export class FinalUserStockModule {}
