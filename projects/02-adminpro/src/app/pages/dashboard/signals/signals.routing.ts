import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
	{
		path: '',
		loadComponent: () =>
			import(
				'./components/test-standalone-route/test-standalone-route.component'
			).then((m) => m.TestStandaloneRouteComponent),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SignalsRoutingModule {}
