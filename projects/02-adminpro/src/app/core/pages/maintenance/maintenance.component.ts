import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { paths } from '../../../shared/constants/paths.constant';
import { AuthService } from '../../../shared/services/http/auth.service';

@Component({
	selector: 'global-maintenance',
	templateUrl: './maintenance.component.html',
	styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent {
	// ANCHOR: Variables

	@ViewChild('imgMaintenance') maintenanceRef!: ElementRef;
	private _maintenanceHtml!: HTMLDivElement;
	private _maintenanceWidth!: number;
	private _maintenanceHeight!: number;

	private _mouseEventSubscriptions: Subscription[] = [];

	private _loginPath = paths.getPath('login');

	// ANCHOR : Constructor

	constructor(private _router: Router, private _authSvc: AuthService) {}

	ngAfterViewInit(): void {
		this._maintenanceHtml = this.maintenanceRef.nativeElement;
		this._maintenanceWidth = this._maintenanceHtml.clientWidth;
		this._maintenanceHeight = this._maintenanceHtml.clientHeight;
		this._createMouseSubscriptions();
	}

	ngOnDestroy(): void {
		this._mouseEventSubscriptions.forEach((sub) => sub.unsubscribe());
	}

	// ANCHOR : Methods

	/**
	 * ? Crea las suscripciones a los eventos del mouse
	 * @private
	 */
	private _createMouseSubscriptions(): void {
		const mouseMove = fromEvent<MouseEvent>(
			this._maintenanceHtml,
			'mousemove'
		).subscribe({
			next: (event) => {
				const { offsetX, offsetY } = event;

				const yRotation =
					((offsetY - this._maintenanceWidth / 2) /
						this._maintenanceWidth) *
					20;
				const xRotation =
					((offsetX - this._maintenanceHeight / 2) /
						this._maintenanceHeight) *
					20;

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

	/**
	 * ? Reintenta volver a la entrada
	 * @public
	 */
	public tryEntry(): void {
		
		this._authSvc.renewToken().subscribe({
			next: () => {
				this._router.navigate([this._loginPath?.fullPath]);
			},
		});
	}
}
