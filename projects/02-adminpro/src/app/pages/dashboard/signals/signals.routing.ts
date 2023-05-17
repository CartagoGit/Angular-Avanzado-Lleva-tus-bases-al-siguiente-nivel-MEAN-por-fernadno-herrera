import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
	{
		path: '',
		// loadComponent: () =>
		// 	import('./signals.component').then(
		// 		(module) => module.SignalsComponent
		// 	),
		pathMatch: 'full',
		children: [],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SignalsRoutingModule {}
