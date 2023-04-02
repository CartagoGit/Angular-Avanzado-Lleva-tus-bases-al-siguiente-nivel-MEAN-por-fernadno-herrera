import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paths } from '../../shared/constants/paths.constant';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

const settingsPath = paths.getPath('settings');
const profilePath = paths.getPath('profile');
const routes: Routes = [
	{
		path: settingsPath?.name,
		component: AccountSettingsComponent,
		data: { titulo: settingsPath?.title },
	},
	{
		path: profilePath?.name,
		data: { titulo: profilePath?.title },
		component: ProfileComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GeneralRoutingModule {}
