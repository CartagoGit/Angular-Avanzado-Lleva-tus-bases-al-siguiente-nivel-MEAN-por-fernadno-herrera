import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { GlobalSearchComponent } from './global-search/global-search.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { GeneralRoutingModule } from './general.routing';

@NgModule({
	declarations: [
		AccountSettingsComponent,
		ProfileComponent,
		GlobalSearchComponent,
	],
	imports: [
		CommonModule,
		GeneralRoutingModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [],
})
export class GeneralModule {}
