import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'projects/02-adminpro/src/environments/environment';
import { CounterAloneComponent } from './components/counterAlone/counter-alone.component';

@Component({
	selector: 'app-standalone',
	standalone: true,
	imports: [CommonModule, CounterAloneComponent],
	templateUrl: './standalone.component.html',
	styles: [
		`
			.map {
				min-height: 400px;
				height: 100%;
			}
		`,
	],
})
export class StandaloneComponent {
	// ANCHOR : Variables

	@ViewChild('map') mapElement!: ElementRef<HTMLDivElement>;

	private _map!: mapboxgl.Map;
	public counterChanged : string = 'Not Changed'

	// ANCHOR : Constructor
	constructor() {}

	ngAfterViewInit(): void {
		this._loadMap();
	}

	// ANCHOR : Methods

	/**
	 * ? Precarga del mapa
	 * @private
	 */
	private _loadMap(): void {
		this._map = new mapboxgl.Map({
			accessToken: environment.MAPBOX_KEY,
			container: this.mapElement.nativeElement,
			style: 'mapbox://styles/mapbox/streets-v11',
		});
	}
}
