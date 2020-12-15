import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndicesComponent } from './indices/indices.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IndicesComponent],
  exports: [IndicesComponent],
})
export class IndicesBarModule {}
