import mongoose, { Document } from 'mongoose';
import { config } from '../../environments/config';
import { from, Observable, switchMap, tap } from 'rxjs';
import { logError, log } from '../helpers/logs.helper';
import autopopulate from 'mongoose-autopopulate';
import mongoosePaginate from 'mongoose-paginate-v2';

//* Aplicamos autopopulate a todo mongoose
mongoose.plugin(autopopulate, { maxDepth: 3 });

//* Aplicamos el plugin de paginacion
mongoosePaginate.paginate.options = {
	limit: 50,
	customLabels: { meta: 'pagination', docs: 'data' },
};
mongoose.plugin(mongoosePaginate);

/**
 * ? Establece la conexion con MongoDB
 */
export const initMongo = () => {
	//* Permite querys exactos y elimina el warning de deprecacion de versiones antiguas de Mongoose
	mongoose.set('strictQuery', false);

	//* Indicamos que no queremos que el valor de fechas de creacion se pueda modificar
	mongoose.set('timestamps.createdAt.immutable', true);

	//* Modificamos la llamada a los metodos para que no devuelva la version y la '_id' la devuelva como 'id'
	const transform = function (
		_document: Document, // document
		modelObject: any, // representation
		_options: any // options
	): void {
		const { __v, _id, password, ...rest } = modelObject;
		return { ...rest, id: _id };
	};
	mongoose.set('toJSON', { transform });
	mongoose.set('toObject', { transform });

	//* Observable para la conexion de mongo y trigger para mostrar mensaje si hay algun cambio en la bd
	getObservableMongoose()
		.pipe(
			tap(() => log(config.MONGO_URL_DB, 'MONGO', 'URL')),
			switchMap((_resp) => {
				mongoState.isMongoConnected = true;
				log('Connected succesfully', 'MONGO');
				return getObservableMongooseChange();
			})
		)
		.subscribe({
			next: (resp) => {
				log(
					`[ ${resp.operationType.toUpperCase()} ]`,
					'MONGO',
					'Something changed in MongoDB'
				);
			},
			error: (error) => {
				logError(error, 'MONGO', 'Mongo connection');
				mongoState.isMongoConnected = false;
			},
		});
};

/**
 * ? Recupera el observable para la conexion con Mongo
 * @returns {Observable<typeof mongoose>}
 */
export const getObservableMongoose = (): Observable<typeof mongoose> => {
	return from(mongoose.connect(config.MONGO_URL_DB, config.MONGO_OPTIONS));
};

/**
 * ? Recupera un observable para capturar los cambios en la base de datos de MongoDB
 * @returns {Observable<any>}
 */
export const getObservableMongooseChange = (): Observable<any> => {
	return from(mongoose.connection.db.watch());
};

/**
 * ? Recupera el estado de la conexión con MongoDB
 * @type {({ isMongoConnected: boolean; getState: () => "Connected" | "Disconnected"; })}
 */
export const mongoState: {
	isMongoConnected: boolean;
	getState: () => 'Connected' | 'Disconnected';
} = {
	isMongoConnected: false,
	getState: function () {
		return !!this.isMongoConnected ? 'Connected' : 'Disconnected';
	},
};
