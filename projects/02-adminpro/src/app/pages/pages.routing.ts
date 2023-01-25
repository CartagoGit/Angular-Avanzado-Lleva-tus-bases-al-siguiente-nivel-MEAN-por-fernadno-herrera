import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic01Component } from './graphic01/graphic01.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component: PagesComponent,
		children: [
			{
				path: '',
				component: DashboardComponent,
			},
			{
				path: 'progress',
				component: ProgressComponent,
			},
			{
				path: 'graphic01',
				component: Graphic01Component,
			},
			{
				path: 'account-settings',
				component: AccountSettingsComponent,
			},
			{
				path: 'promises',
				component: PromisesComponent,
			},
			{
				path: 'rxjs',
				component: RxjsComponent,
			},
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
