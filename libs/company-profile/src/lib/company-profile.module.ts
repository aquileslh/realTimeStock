import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';

const materialModule = [MatTabsModule];
@NgModule({
  imports: [CommonModule, [...materialModule]],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
})
export class CompanyProfileModule {}
