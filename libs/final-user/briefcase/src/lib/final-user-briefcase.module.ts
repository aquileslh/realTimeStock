import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
