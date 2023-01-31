import { TypeRequest } from './response.interface';

export type LogType = 'MONGO' | 'EXPRESS' | 'LOG' | 'CRITICAL ERROR' | Uppercase<TypeRequest>;
