import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { Graphic01Component } from './graphic01/graphic01.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ComponentsModule } from '../../shared/components/components.module';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
	declarations: [
		MainDashboardComponent,
		Graphic01Component,
		ProgressComponent,
		PromisesComponent,
		RxjsComponent,
	],
	imports: [CommonModule, DashboardRoutingModule, ComponentsModule],
	exports: [],
})
export class DashboardModule {}
