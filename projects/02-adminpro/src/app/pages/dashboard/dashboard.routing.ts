import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paths } from '../../shared/constants/paths.constant';
import { Graphic01Component } from './graphic01/graphic01.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const dashboardPath = paths.getPath('dashboard');
const progressBarPath = paths.getPath('progressBar');
const graphic01Path = paths.getPath('graphic01');
const promisesPath = paths.getPath('promises');
const rxjsPath = paths.getPath('rxjs');
const standalonePath = paths.getPath('standalone');
const routes: Routes = [
	{
		path: '',
		component: MainDashboardComponent,
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
		path: standalonePath?.name,
		loadComponent: () =>
			import('./standalone/standalone.component').then(
				(module) => module.StandaloneComponent
			),
		data: { titulo: standalonePath?.title },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
