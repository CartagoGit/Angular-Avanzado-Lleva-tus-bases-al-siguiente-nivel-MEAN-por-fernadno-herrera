import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
