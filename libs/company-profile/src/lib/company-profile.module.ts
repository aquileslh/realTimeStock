import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class CompanyProfileModule {}
