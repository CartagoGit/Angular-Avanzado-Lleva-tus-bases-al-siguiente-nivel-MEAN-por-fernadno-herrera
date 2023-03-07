import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaintenanceGuard } from './shared/guards/maintenance.guard';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';
import { paths } from './shared/constants/paths.constant';

const routes: Routes = [
	//* Mantenimiento
	{
		path: paths.getPath('maintenance')?.name,
		loadChildren: () =>
			import('./core/pages/maintenance/maintenance.module').then(
				(m) => m.MaintenanceModule
			),
		canMatch: [MaintenanceGuard],
	},
	// * Solo cuando no estamos logueados
	{
		path: '',
		loadChildren: () =>
			import('./core/pages/auth/auth.module').then((m) => m.AuthModule),
		canMatch: [MaintenanceGuard, AuthenticatedGuard],
	},
	//* Hay que estar logueado
	{
		path: '',
		loadChildren: () =>
			import('./pages/pages.module').then((m) => m.PagesModule),
		canMatch: [MaintenanceGuard, AuthenticatedGuard],
	},
	//* Publicas
	{
		path: '**',
		loadChildren: () =>
			import('./core/pages/nopagefound/nopagefound.module').then(
				(m) => m.NopagefoundModule
			),
		canMatch: [MaintenanceGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {
	constructor() {}
}
