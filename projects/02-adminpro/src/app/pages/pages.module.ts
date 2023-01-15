import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Graphic01Component } from './graphic01/graphic01.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    Graphic01Component,
    ProgressComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
})
export class PagesModule {}
