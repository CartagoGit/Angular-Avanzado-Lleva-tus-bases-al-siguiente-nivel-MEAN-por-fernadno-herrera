import { Directive, ElementRef, HostListener } from '@angular/core';
import { pathImageError } from '../constants/strings.constants';

@Directive({
	selector: 'img',
})
export class ImgErrorDirective {
	constructor(private _el: ElementRef) {}

	@HostListener('error')
	onError() {
		this._el.nativeElement.src = pathImageError;
	}
}
