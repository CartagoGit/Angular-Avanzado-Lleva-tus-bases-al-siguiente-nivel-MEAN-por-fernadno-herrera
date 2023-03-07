import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TermsComponent } from './terms/terms.component';
import { paths } from '../../../shared/constants/paths.constant';

const registerPath = paths.getPath('register');
const loginPath = paths.getPath('login');
const termsPath = paths.getPath('terms');

const routes: Routes = [
	{
		path: registerPath?.name,
		data: { titulo: registerPath?.title },
		component: RegisterComponent,
	},
	{
		path: loginPath?.name,
		data: { titulo: loginPath?.title },
		component: LoginComponent,
	},
	{
		path: termsPath?.name,
		data: { titulo: termsPath?.title },
		component: TermsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
