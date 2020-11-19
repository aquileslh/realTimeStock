import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class CompanyProfileModule {}
