import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [BreadcrumbsComponent, HeaderComponent, SidebarComponent],
	imports: [CommonModule, RouterModule, PipesModule, FormsModule],
	exports: [BreadcrumbsComponent, HeaderComponent, SidebarComponent],
})
export class ContainerModule {}
