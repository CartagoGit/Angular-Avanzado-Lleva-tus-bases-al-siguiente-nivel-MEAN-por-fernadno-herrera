import { Router } from "express";
import { CallbackMethod, TypeRequest } from "./response.interface";


/**
 * ? Interfaz de propiedades que tienen todas las rutas
 * @export
 * @interface RoutesProps
 * @typedef {RoutesProps}
 */
export interface RoutesProps {
	route: string;
	coreController?: CallbackMethod;
	routeRouter?: Router;
	middlewares?: ((...args: any[]) => void)[];
	hasJwtValidator?: boolean;
	hasAdminValidator?: boolean;
	hasSameUserValidator?: boolean;
	type?: TypeRequest;
	router?: Router;
	modelController?: CallbackMethod;
}
