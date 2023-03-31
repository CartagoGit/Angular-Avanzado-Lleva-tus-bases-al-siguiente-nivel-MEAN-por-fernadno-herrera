import { ChangeDetectorRef, Component } from '@angular/core';
import { ProgressProps } from '../../../shared/interfaces/progress-props.interface';

@Component({
	selector: 'app-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
	// ANCHOR - Variables
	public examples: ProgressProps[] = [
		{
			colorBootstrap: 'primary',
			value: 15,
			typeNumber: 'percent',
			title: 'Example - With percent',
		},
		{
			value: 30,
			colorBootstrap: 'info',
			typeNumber: 'pixel',
			title: 'Example - With pixels',
			max: 150,
			min: 0,
		},
		{
			value: 300,
			colorBootstrap: 'success',
			typeNumber: 'euro',
			title: 'Example - With euros',
			max: 5000,
			min: -3000,
			range: 1000,
		},
		{
			value: -50000,
			colorBootstrap: 'danger',
			typeNumber: 'dolar',
			title: 'Example - With dollars',
			max: -10000,
			min: -100000,
			range: 5000,
		},
	];

	// ANCHOR: Constructor

	constructor(private _cdRef: ChangeDetectorRef) {}
	ngAfterViewInit() {
		this._cdRef.detectChanges();
	}
}
