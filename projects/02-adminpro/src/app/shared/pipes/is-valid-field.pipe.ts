import { Pipe, PipeTransform } from '@angular/core';


/**
 * ? Comprueba si un campo es valido en un formulario reactivo
 * @export
 * @class IsValidFieldPipe
 * @typedef {IsValidFieldPipe}
 * @implements {PipeTransform}
 */
@Pipe({
	name: 'isValidField',
})
export class IsValidFieldPipe implements PipeTransform {
	transform(data: [isValidField: boolean, formSubmitted: boolean]): unknown {
		const [isValidField, formSubmitted] = data;
		return !isValidField && formSubmitted;
	}
}
