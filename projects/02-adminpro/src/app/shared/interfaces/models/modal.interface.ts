import { Type } from '@angular/core';
import { Observable } from 'rxjs';

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
	// afterClosed: Observable<any>;
}

export interface ModalOptions {
	hasDefaultHeader?: boolean;
	hasDefaultFooter?: boolean;
	closeOnOutsideClick?: boolean;
	defaultButtons? : ModalButton[];
}

export interface ModalButton {
}


//
