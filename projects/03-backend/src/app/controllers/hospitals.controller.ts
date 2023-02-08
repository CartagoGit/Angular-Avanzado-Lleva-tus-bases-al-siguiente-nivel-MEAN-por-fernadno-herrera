import { Request } from 'express';
import { getPayloadFromJwtWithoutVerifiy } from '../helpers/json-web-token.helper';
import { UserModel} from '../models/mongo-models/user.model';

export const hospitalsController: {
	post: (req: Request) => Promise<any>;
} = {
	post: async (req) => {
		const { id } = getPayloadFromJwtWithoutVerifiy(req);
		const creator: typeof UserModel | null = await UserModel.findById(id);
		req.body['user_creator'] = creator;

		// cleanValidatorField(req, 'creator');
		return req.body;
	},
};
