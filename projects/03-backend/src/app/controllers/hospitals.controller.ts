import { Request } from 'express';
import { getPayloadFromJwtWithoutVerifiy } from '../helpers/json-web-token.helper';
import { UserModel} from '../models/mongo-models/user.model';

export const hospitalsController: {
	post: (req: Request) => Promise<any>;
} = {
	post: async (req) => {

	},
};
