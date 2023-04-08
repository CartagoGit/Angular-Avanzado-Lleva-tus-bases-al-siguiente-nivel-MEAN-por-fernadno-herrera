/**
 * ? Interface de error basico
 * @export
 * @interface BasicError
 * @typedef {BasicError}
 */
export interface BasicError {
	message?: string;
	methodName?: string;
	className?: string;
	reason?: string;
	line?: string | number;
	file?: string;
	infoObject?: any;
}
