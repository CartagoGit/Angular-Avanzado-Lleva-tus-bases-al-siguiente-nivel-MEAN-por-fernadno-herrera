import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-nav-menu',
	standalone: true,
	imports: [CommonModule, NgFor, RouterModule],
	template: `<div class="buttons ">
		<span
			*ngFor="let route of menuRoutes"
			class="pointer btn btn-outline-secondary mr-2"
			[routerLink]="route.path"
		>
			{{ route.name }}
		</span>
	</div>`,
	styles: [],
})
export class NavMenuComponent {
	public menuRoutes: { name: string; path: string }[] = [
		{ name: 'Counter', path: './counter' },
		{ name: 'Info', path: './info' },
		{ name: 'Properties', path: './properties' },
	];
}
