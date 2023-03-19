import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	declarations: [AccountSettingsComponent, ProfileComponent],
	imports: [CommonModule],
	exports: [AccountSettingsComponent, ProfileComponent],
})
export class GeneralModule {}
