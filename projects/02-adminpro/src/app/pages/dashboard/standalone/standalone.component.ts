import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'projects/02-adminpro/src/environments/environment';

@Component({
	selector: 'app-standalone',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './standalone.component.html',
	styles: [`
	.map {
		min-height : 500px;
		height: 100%;
	}
	`],
})
export class StandaloneComponent {
	// ANCHOR : Variables

	@ViewChild('map') mapElement!: ElementRef<HTMLDivElement>;

	private _map!: mapboxgl.Map;
	// private mapBoxToken =

	// ANCHOR : Constructor
	constructor() {}

	ngAfterViewInit(): void {
		this._map = new mapboxgl.Map({
			accessToken: environment.MAPBOX_KEY,
			container: this.mapElement.nativeElement,
			style: 'mapbox://styles/mapbox/streets-v11',
		});
	}

	// ANCHOR : Methods
}
