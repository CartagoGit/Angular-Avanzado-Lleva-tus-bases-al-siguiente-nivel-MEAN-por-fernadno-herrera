import { TypeRequest } from './response.interface';

export type LogType = 'MONGO' | 'EXPRESS' | 'LOG' | Uppercase<TypeRequest>;
