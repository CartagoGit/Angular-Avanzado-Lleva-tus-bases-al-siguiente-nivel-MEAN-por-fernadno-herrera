import { Request, Response } from 'express';
import { defaultResponse } from '../helpers/default-responses';
import {
	getModelSection,
	getNewModelSection,
} from '../helpers/get-model-section.helper';

export const coreController = {
	get: (
		req: Request,
		res: Response,
		modelCallback: (res: Response, req: Request) => void
	) => {
		const callback = async () => {
			modelCallback(res, req);
			const data = await getModelSection(req).find();
			return { data, message: 'GOT ALL' };
		};
		defaultResponse(res, req, callback, 'GET');
	},
	getById: (
		req: Request,
		res: Response,
		modelCallback: (res: Response, req: Request) => void
	) => {
		const callback = async () => {
			modelCallback(res, req);
			const data = await getModelSection(req).findById(req.params['id']);
			return { data, message: 'GOT BY ID' };
		};
		defaultResponse(res, req, callback, 'GET');
	},
	post: (
		req: Request,
		res: Response,
		modelCallback: (res: Response, req: Request) => void
	) => {
		const callback = async () => {
			modelCallback(res, req);
			const model = getNewModelSection(req);
			await model.save();
			return { model, message: 'POSTED' };
		};

		defaultResponse(res, req, callback, 'POST', 201);
	},
	put: (
		req: Request,
		res: Response,
		modelCallback: (res: Response, req: Request) => void
	) => {
		const callback = async () => {
			modelCallback(res, req);
			const id = req.params['id'];
			const data = await getModelSection(req).findByIdAndUpdate(
				id,
				req.body
			);
			return { data, message: 'PUT', id };
		};
		defaultResponse(res, req, callback, 'PUT');
	},
};
