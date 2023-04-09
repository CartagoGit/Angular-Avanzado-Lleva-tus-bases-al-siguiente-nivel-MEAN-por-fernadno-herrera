import {
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	Type,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { ModalState } from '../../interfaces/models/modal.interface';
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

	public componentRef?: ComponentRef<any>;

	// ANCHOR - Constructor
	constructor(public modalSvc: ModalService) {}

	ngAfterViewInit(): void {
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
		const { component, data } = state;
		console.log('❗state ➽ ⏩', state);
		this.componentRef = this.content.createComponent(component);
		if (this.componentRef?.instance?.data)
			this.componentRef.instance.data = data;

		this.content.insert(this.componentRef.hostView);
		return true;
	}
}
