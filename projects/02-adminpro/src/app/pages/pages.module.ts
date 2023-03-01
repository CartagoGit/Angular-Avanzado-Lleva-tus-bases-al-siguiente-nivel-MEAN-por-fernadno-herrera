import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../shared/components/components.module';


// Componentes
import { Graphic01Component } from './graphic01/graphic01.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PagesRoutingModule } from './pages.routing';

@NgModule({
	declarations: [
		DashboardComponent,
		PagesComponent,
		Graphic01Component,
		ProgressComponent,
		AccountSettingsComponent,
		PromisesComponent,
		RxjsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		RouterModule,
		PagesRoutingModule,
		ComponentsModule,
	],
})
export class PagesModule {}
