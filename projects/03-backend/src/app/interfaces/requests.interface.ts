import { Schema } from 'mongoose';

export interface requestModifierArrays {
	field: string;
	value?: any; // O Se envia el valor
	id?: Schema.Types.ObjectId; // O se envia la id
}
