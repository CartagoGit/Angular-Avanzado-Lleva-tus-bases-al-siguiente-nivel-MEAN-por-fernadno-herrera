import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
	{
		path: '',
		loadComponent: () =>
			import('./pages/signals-page.component').then(
				(module) => module.SignalsPageComponent
			),
		pathMatch: 'full',
	},
	{
		path: 'counter',
		loadComponent: () =>
			import('./pages/counter-page.component').then(
				(module) => module.CounterPageComponent
			),
	},
	{
		path: 'info',
		loadComponent: () =>
			import('./pages/user-info-page.component').then(
				(module) => module.UserInfoPageComponent
			),
	},
	{
		path: 'properties',
		loadComponent: () =>
			import('./pages/properties-page.component').then(
				(module) => module.PropertiesPageComponent
			),
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SignalsRoutingModule {}
