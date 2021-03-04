import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BriefcaseComponent } from './briefcase/briefcase.component';

const routes: Routes = [
  {
    path: '',
    component: BriefcaseComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [BriefcaseComponent],
})
export class FinalUserBriefcaseModule {}
