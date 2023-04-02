import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paths } from '../../shared/constants/paths.constant';
import { DoctorsComponent } from './doctors/doctors.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { UsersComponent } from './users/users.component';

const usersPath = paths.getPath('users');
const hospitalsPath = paths.getPath('hospitals');
const doctorsPath = paths.getPath('doctors');

const routes: Routes = [
	{
		path: usersPath?.name,
		component: UsersComponent,
		data: { titulo: usersPath?.title },
	},
	{
		path: hospitalsPath?.name,
		component: HospitalsComponent,
		data: { titulo: hospitalsPath?.title },
	},
	{
		path: doctorsPath?.name,
		component: DoctorsComponent,
		data: { titulo: doctorsPath?.title },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SupportRoutingModule {}
