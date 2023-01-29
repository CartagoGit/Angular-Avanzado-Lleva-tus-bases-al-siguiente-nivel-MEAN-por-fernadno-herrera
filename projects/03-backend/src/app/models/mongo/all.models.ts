import { Model } from 'mongoose';
import { UserModel } from './user.model';

export const ApiModels: Record<string, Model<any>> = {
	Users: UserModel,
};
