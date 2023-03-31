import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



/**
 * ? Sanitiza una url para rutas de imagenes
 * @export
 * @class SanitizerPipe
 * @typedef {SanitizerPipe}
 * @implements {PipeTransform}
 */
@Pipe({
	name: 'safe',
})
export class SanitizerPipe implements PipeTransform {
	constructor(private _sanitized: DomSanitizer) {}
	transform(value: string): SafeUrl | string {
		if (!value) return value;
		return this._sanitized.bypassSecurityTrustUrl(value);
	}
}
