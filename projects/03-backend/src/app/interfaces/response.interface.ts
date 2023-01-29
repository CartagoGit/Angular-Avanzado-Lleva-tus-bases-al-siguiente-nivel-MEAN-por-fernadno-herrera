export interface DefaultResponseProps {
	ok: boolean;
	message: string;
	status_code: number;
	data?: unknown;
	error_message?: string;
	error?: Error;
}
