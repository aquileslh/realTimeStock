import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { IndicesBarModule } from '@grillo-software/indices-bar';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'portafolio',
    loadChildren: () =>
      import('@grillo-software/final-user/briefcase').then((m) => m.FinalUserBriefcaseModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@grillo-software/admin-dashboard').then((m) => m.AdminDashboardModule),
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    IndicesBarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
