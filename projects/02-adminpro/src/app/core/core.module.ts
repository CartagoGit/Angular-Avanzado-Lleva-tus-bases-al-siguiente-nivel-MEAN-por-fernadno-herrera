import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthModule } from './pages/auth/auth.module';
import { NopagefoundModule } from './pages/nopagefound/nopagefound.module';
import { MaintenanceRoutingModule } from './pages/maintenance/maintenance.routing';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule,
		AuthModule,
		NopagefoundModule,
		MaintenanceRoutingModule,
	],
	exports: [],
})
export class CoreModule {}
