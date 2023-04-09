import {
	Component,
	ComponentRef,
	ElementRef,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import {
	ModalState,
	ModalOptions,
} from '../../interfaces/models/modal.interface';
import { ModalService } from '../../services/settings/modal.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
	// ANCHOR - Variables
	@ViewChild('modalContent', { read: ViewContainerRef })
	content?: ViewContainerRef;

	@ViewChild('backdrop') backdrop?: ElementRef<HTMLDivElement>;

	public componentRef?: ComponentRef<any>;

	public options?: ModalOptions;

	// ANCHOR - Constructor
	constructor(public modalSvc: ModalService) {}

	ngAfterViewInit(): void {
		// * Asigna el contenedor del modal al servicio
		this.modalSvc.assignContainerModal(this);
	}

	// ANCHOR - Methods

	/**
	 * ? Incrusta un componente dentro del modal
	 * @public
	 * @template C
	 * @param {ModalState<C>} state
	 * @returns {boolean}
	 */
	public createChildComponent<C>(state: ModalState<C>): boolean {
		if (!this.content) return false;
		const { component, data, options } = state;
		this.options = options;
		this.content.clear();
		this.componentRef = this.content.createComponent(component);
		if (this.componentRef?.instance?.data)
			this.componentRef.instance.data = data;

		this.content.insert(this.componentRef.hostView);
		return true;
	}

	/**
	 *  ? Cierra el modal
	 * @public
	 */
	public close(): void {
		this.modalSvc.close();
	}


	/**
	 * ? Cierra el modal al hacer click fuera del modal si la opcion esta activada
	 * @public
	 * @param {MouseEvent} event
	 */
	public clickBackdrop(event: MouseEvent): void {
		const clickedElement = event.target as HTMLElement;
		const closestDiv = clickedElement.closest('div');
		const containerDiv = this.backdrop?.nativeElement;

		if (closestDiv !== containerDiv) return;
		this.close();
	}
}
