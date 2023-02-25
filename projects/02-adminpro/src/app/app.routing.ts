import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';


import { NoPageFoundComponent } from './core/pages/nopagefound/nopagefound.component';
import { AuthRoutingModule } from './core/pages/auth/auth.routing';

const routes: Routes = [
  //* Hay que estar logueado
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  //* Publicas
  {
    path: '**',
    component: NoPageFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
