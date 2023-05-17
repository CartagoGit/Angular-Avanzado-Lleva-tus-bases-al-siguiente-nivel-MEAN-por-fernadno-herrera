import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
	{
		path: '',
		loadComponent: () =>
			import('./pages/signals-page/signals-page.component').then(
				(module) => module.SignalsPageComponent
			),
		pathMatch: 'full',
	},
	{
		path: 'counter',
		loadComponent: () =>
			import('./pages/counter-page/counter-page.component').then(
				(module) => module.CounterPageComponent
			),
	},
	{
		path: 'info',
		loadComponent: () =>
			import('./pages/user-info-page/user-info-page.component').then(
				(module) => module.UserInfoPageComponent
			),
	},
	{
		path: 'properties',
		loadComponent: () =>
			import('./pages/properties-page/properties-page.component').then(
				(module) => module.PropertiesPageComponent
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SignalsRoutingModule {}
