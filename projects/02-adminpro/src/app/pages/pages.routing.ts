import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic01Component } from './graphic01/graphic01.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { paths } from '../shared/constants/paths.constant';

const dashboardPath = paths.getPath('dashboard');
const progressBarPath = paths.getPath('progressBar');
const graphic01Path = paths.getPath('graphic01');
const promisesPath = paths.getPath('promises');
const rxjsPath = paths.getPath('rxjs');
const generalPath = paths.getPath('general');
const settingsPath = paths.getPath('settings');
const profilePath = paths.getPath('profile');
const nonPageFound = paths.getPath('no-page-found');

const routes: Routes = [
	{
		path: dashboardPath?.name,
		component: PagesComponent,
		children: [
			{
				path: '',
				component: DashboardComponent,
				data: { titulo: dashboardPath?.title },
				pathMatch: 'full',
			},
			{
				path: progressBarPath?.name,
				component: ProgressComponent,
				data: { titulo: progressBarPath?.title },
			},
			{
				path: graphic01Path?.name,
				component: Graphic01Component,
				data: { titulo: graphic01Path?.title },
			},
			{
				path: promisesPath?.name,
				component: PromisesComponent,
				data: { titulo: promisesPath?.title },
			},
			{
				path: rxjsPath?.name,
				component: RxjsComponent,
				data: { titulo: rxjsPath?.title },
			},
			{
				path: '**',
				redirectTo: nonPageFound?.fullPath!,
			},
		],
	},
	{
		path: generalPath?.name,
		component: PagesComponent,
		children: [
			{
				path: settingsPath?.name,
				component: AccountSettingsComponent,
				data: { titulo: settingsPath?.title },
			},
			{
				path: profilePath?.name,
				data: { titulo: profilePath?.title },
				redirectTo: dashboardPath?.fullPath,
			},
			{
				path: '**',
				redirectTo: nonPageFound?.fullPath!,
			},
		],
	},

	// {
	// 	path: '',
	// 	loadChildren: () =>
	// 		import('../core/pages/nopagefound/nopagefound.module').then(
	// 			(m) => m.NopagefoundModule
	// 		),
	// 		pathMatch: 'full',
	// },
	{
		path: '**',
		redirectTo: nonPageFound?.fullPath!,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
