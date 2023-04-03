import { Directive,  ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: 'img',
})
export class ImgErrorDirective {

	constructor(private _el: ElementRef) {}

	@HostListener('error')
	onError() {
		this._el.nativeElement.src = '/assets/images/image-error.jpg';
	}
}
