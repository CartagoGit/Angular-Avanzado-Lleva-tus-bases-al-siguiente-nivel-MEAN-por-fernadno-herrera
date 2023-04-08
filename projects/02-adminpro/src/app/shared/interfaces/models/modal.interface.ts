import { Type } from '@angular/core';

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
}

//
