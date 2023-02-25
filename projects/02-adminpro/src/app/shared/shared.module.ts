import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from './components/components.module';
import { ContainerModule } from './container/container.module';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule,
		ComponentsModule,
		ContainerModule,
		PipesModule,
		DirectivesModule,
	],
	exports: [ComponentsModule, ContainerModule, PipesModule, DirectivesModule],
})
export class SharedModule {}
