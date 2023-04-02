import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { paths } from '../shared/constants/paths.constant';
import { PagesComponent } from './pages.component';

const dashboardPath = paths.getPath('dashboard');
const generalPath = paths.getPath('general');
const supportPath = paths.getPath('support');
const nonPageFound = paths.getPath('no-page-found');

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: dashboardPath?.name,
				loadChildren: () =>
					import('./dashboard/dashboard.module').then(
						(m) => m.DashboardModule
					),
			},
			{
				path: generalPath?.name,
				loadChildren: () =>
					import('./general/general.module').then((m) => m.GeneralModule),
			},
			{
				path: supportPath?.name,
				loadChildren: () =>
					import('./support/support.module').then((m) => m.SupportModule),
			},
		],
	},

	{
		path: '',
		redirectTo: dashboardPath?.fullPath!,
		pathMatch: 'full',
	},
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
