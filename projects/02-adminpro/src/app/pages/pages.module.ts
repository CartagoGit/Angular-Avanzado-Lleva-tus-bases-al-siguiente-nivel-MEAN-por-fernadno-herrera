import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GeneralModule } from './general/general.module';

// Rutas
import { PagesRoutingModule } from './pages.routing';
// Componentes
import { PagesComponent } from './pages.component';

@NgModule({
	declarations: [PagesComponent],
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		RouterModule,
		PagesRoutingModule,
		DashboardModule,
		GeneralModule,
	],
})
export class PagesModule {}
