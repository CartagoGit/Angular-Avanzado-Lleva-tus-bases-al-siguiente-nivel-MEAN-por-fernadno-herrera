import { NextFunction, Request, Response } from 'express';

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
	callback: () => Promise<any> | void,
	next?: NextFunction,
) => void | Promise<void>;

export type TypeRequest = 'get' | 'post' | 'patch' | 'put' | 'delete' | 'use';
