import { NextFunction, Request, Response } from "express";

export interface DefaultResponseProps {
	ok: boolean;
	message: string;
	status_code: number;
	data?: unknown;
	error_message?: string;
	error?: Error;
	db_state?: string;
}

export type CallbackMethod = (
	req: Request,
	res: Response,
	next?: NextFunction
) => void;
