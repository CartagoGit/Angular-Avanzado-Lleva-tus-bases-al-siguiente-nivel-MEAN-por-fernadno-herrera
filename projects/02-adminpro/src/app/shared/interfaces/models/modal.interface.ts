import { Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';

/**
 * ? Interface para definir el estado del modal
 * @export
 * @interface ModalState
 * @typedef {ModalState}
 * @template T
 * @template D
 */
export interface ModalState<C = any, D = any> {
	isOpen: boolean;
	component: Type<C>;
	data: D;
	options: ModalOptions;
	afterClosedSubject: Subject<ModalReturnedAtOpen>;
}

/**
 * ? Interface para definir las opciones del modal
 * @export
 * @interface ModalOptions
 * @typedef {ModalOptions}
 */
export interface ModalOptions {
	hasDefaultHeader?: boolean;
	hasDefaultFooter?: boolean;
	closeOnOutsideClick?: boolean;
	// defaultButtons? : ModalButton[];
}

/**
 * ? Interfaz que define el valor que se retorna al abrir un modal
 * @export
 * @interface ModalReturnedAtOpen
 * @typedef {ModalReturnedAtOpen}
 */
export interface ModalReturnedAtOpen {
	afterClosed$: Observable<any>;
	close: () => void;
	modalContainer: ModalComponent;
}

//
