import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
	selector: 'app-maintenance',
	templateUrl: './maintenance.component.html',
	styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent {
	@ViewChild('imgMaintenance') maintenanceRef!: ElementRef;
	private _maintenanceHtml!: HTMLDivElement;
	private _maintenanceWidth!: number;
	private _maintenanceHeight!: number;

	private _mouseEventSubscriptions: Subscription[] = [];

	ngAfterViewInit(): void {
		this._maintenanceHtml = this.maintenanceRef.nativeElement;
		this._maintenanceWidth = this._maintenanceHtml.clientWidth;
		this._maintenanceHeight = this._maintenanceHtml.clientHeight;

		const mouseMove = fromEvent<MouseEvent>(
			this._maintenanceHtml,
			'mousemove'
		).subscribe({
			next: (event) => {
				const { layerX, layerY } = event as any;

				const yRotation =
					((layerY - this._maintenanceWidth / 2) /
						this._maintenanceWidth) *
					10;
				const xRotation =
					((layerX - this._maintenanceHeight / 2) /
						this._maintenanceHeight) *
					10;

				const stringRotation = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1) perspective(500px) scale(1.1)`;

				this._maintenanceHtml.style.transform = stringRotation;
			},
		});

		const mouseLeave = fromEvent<MouseEvent>(
			this._maintenanceHtml,
			'mouseleave'
		).subscribe({
			next: () => {
				const stringReset = `perspective(500px) scale(1) rotateX(0deg) rotateY(0deg) scale(1)`;
				this._maintenanceHtml.style.transform = stringReset;
			},
		});

		this._mouseEventSubscriptions.push(mouseMove, mouseLeave);
	}

	ngOnDestroy(): void {
		this._mouseEventSubscriptions.forEach((sub) => sub.unsubscribe());
	}
}
