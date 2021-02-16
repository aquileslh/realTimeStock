import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {
        path: 'list',
        loadChildren: () =>
        import('@grillo-software/stock-list').then((m) => m.StockListModule),
      },
    ]
  }
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [BoardComponent],
})
export class AdminBoardModule {}
