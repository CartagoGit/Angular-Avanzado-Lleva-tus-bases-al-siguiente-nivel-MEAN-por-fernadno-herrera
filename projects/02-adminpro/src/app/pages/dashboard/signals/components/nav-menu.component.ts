import { Component, Signal, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuRoutes } from '../interfaces/menu-routes.interface';

@Component({
	selector: 'app-nav-menu',
	standalone: true,
	imports: [CommonModule, NgFor, RouterModule],
	template: ` <div class="d-flex justify-content-around mb-3">
		<div class="buttons ">
			<span
				*ngFor="let route of menuRoutes()"
				class="pointer btn btn-outline-secondary mr-2"
				[routerLink]="route.path"
				routerLinkActive="active"
			>
				{{ route.name }}
			</span>
		</div>
		<code
			class="pointer"
			routerLink="./"
			routerLinkActive="active"
			[routerLinkActiveOptions]="{ exact: true }"
		>
			{{ phrase() }}
		</code>
	</div>`,
	styles: [
		`
			code {
				padding: 0 10px;
				display: grid;
				place-items: center;
			}
			code.active {
				outline: 2px dashed grey;
			}
		`,
	],
})
export class NavMenuComponent {
	public phrase: Signal<string> = signal('The signals are strange tonight!');
	// public phrase = 'The signals are strange tonight!';
	public menuRoutes: Signal<MenuRoutes[]> = signal([
		{ name: 'Counter', path: './counter' },
		{ name: 'Info', path: './info' },
		{ name: 'Properties', path: './properties' },
	]);
	// public menuRoutes: { name: string; path: string }[] = [
	// 	{ name: 'Counter', path: './counter' },
	// 	{ name: 'Info', path: './info' },
	// 	{ name: 'Properties', path: './properties' },
	// ];
}
