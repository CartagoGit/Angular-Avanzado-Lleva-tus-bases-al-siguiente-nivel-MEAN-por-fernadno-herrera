import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [AccountSettingsComponent, ProfileComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [AccountSettingsComponent, ProfileComponent],
})
export class GeneralModule {}
