import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfileModule } from '@grillo-software/company-profile';
import { BriefcaseComponent } from './briefcase/briefcase.component';

const routes: Routes = [
  {
    path: '',
    component: BriefcaseComponent,
  },
];
@NgModule({
  imports: [CommonModule, CompanyProfileModule, RouterModule.forChild(routes)],
  declarations: [BriefcaseComponent],
})
export class FinalUserBriefcaseModule {}
