import { Request } from 'express';
import { ResponseReturnData } from '../interfaces/response.interface';

/**
 * ? Controladores especificos para las busquedas en todos los modelos
 * @type {{
	getFromEverywhere: (req: Request) => Promise<ResponseReturnData>;
}}
 */
export const everywhereController: {
	getFromEverywhere: (req: Request) => Promise<ResponseReturnData>;
} = {
	getFromEverywhere: async (req) => {
		return { status_code: 200, data: 'pollega' };
	},
};
