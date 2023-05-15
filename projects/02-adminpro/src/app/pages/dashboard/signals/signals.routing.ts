import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
	{
		path: '',
		loadComponent: () =>
			import('./layout/signals-layout/signals-layout.component').then(
				(m) => m.SignalsLayoutComponent
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SignalsRoutingModule {}
