import mongoose from 'mongoose';
import { config } from '../../environments/config';
import { from, Observable, tap } from 'rxjs';
import { logError, log } from '../helpers/logs';

export const initMongo = () => {
	mongoose.set('strictQuery', false);

	getObservableMongoose()
		.pipe(tap(() => log(config.MONGO_URL_APP, 'MONGO', 'URL')))
		.subscribe({
			next: (_resp) => {
				isMongoConnected = true;
				log('Connected succesfully', 'MONGO');
			},
			error: (error) => {
				logError(error, 'MONGO', 'Mongo connection');
				isMongoConnected = false;
			},
		});
};

export const getObservableMongoose = (): Observable<typeof mongoose> => {
	return from(mongoose.connect(config.MONGO_URL_APP, config.MONGO_OPTIONS));
};

export let isMongoConnected = false;
