import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CompanyProfileComponent],
  exports: [CompanyProfileComponent]
})
export class SharedSharedComponentModule {}
