import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'isValidField',
})
export class IsValidFieldPipe implements PipeTransform {
	transform(data: [isValidField: boolean, formSubmitted: boolean]): unknown {
		const [isValidField, formSubmitted] = data;
		return !isValidField && formSubmitted;
	}
}
