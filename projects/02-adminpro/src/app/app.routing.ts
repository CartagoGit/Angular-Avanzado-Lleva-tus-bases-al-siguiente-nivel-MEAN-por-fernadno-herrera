import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaintenanceGuard } from './shared/guards/maintenance.guard';
import { ApiOnlineGuard } from './shared/guards/api-online.guard';

const routes: Routes = [
	//* Mantenimiento
	{
		path: 'maintenance',
		loadChildren: () =>
			import('./core/pages/maintenance/maintenance.module').then(
				(m) => m.MaintenanceModule
			),
		canMatch: [ApiOnlineGuard],
	},
	//* Hay que estar logueado
	{
		path: '',
		loadChildren: () =>
			import('./pages/pages.module').then((m) => m.PagesModule),
		canMatch: [MaintenanceGuard],
	},
	//* Solo cuando no estamos logueados
	{
		path: '',
		loadChildren: () =>
			import('./core/pages/auth/auth.module').then((m) => m.AuthModule),
		canMatch: [MaintenanceGuard],
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
export class AppRoutingModule {}
