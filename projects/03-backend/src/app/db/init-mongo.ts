import mongoose, { Model } from 'mongoose';
import { config } from '../../environments/config';
import { forkJoin, from, fromEvent, Observable, switchMap, tap } from 'rxjs';
import { logError, log } from '../helpers/logs';

export const initMongo = () => {
	mongoose.set('strictQuery', false);

	getObservableMongoose()
		.pipe(
			tap(() => log(config.MONGO_URL_APP, 'MONGO', 'URL')),
			switchMap((_resp) => {
				isMongoConnected = true;
				log('Connected succesfully', 'MONGO');
				return getObservableMongooseChange();
			})
		)
		.subscribe({
			next: (resp) => {
				log(
					resp.operationType.charAt(0).toUpperCase() +
						resp.operationType.slice(1).toLowerCase(),
					'MONGO',
					'Something changed in MongoDB'
				);
				// console.log((resp as any).fullDocument);
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

export const getObservableMongooseChange = () => {
	return from(mongoose.connection.db.watch());
};

export let isMongoConnected = false;
