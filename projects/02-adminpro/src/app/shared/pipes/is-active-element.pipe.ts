import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'isActiveElement',
})
export class IsActiveElement implements PipeTransform {
	transform(value: HTMLElement): boolean {
		console.log(document.activeElement === value);
		console.log(document.activeElement, value);
		return document.activeElement === value;
	}
}
