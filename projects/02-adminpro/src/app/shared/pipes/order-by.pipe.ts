import { Pipe, PipeTransform } from '@angular/core';
import { getPropertyByString } from '../helpers/object.helper';

@Pipe({
	name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
	transform(array: any[], sortBy: string, order?: 'asc' | 'desc'): any[] {
		const sortOrder = order ? order : 'asc'; // setting default ascending order
		const orderArray = [...array].sort((a: any, b: any) => {
			const aProp = getPropertyByString(a, sortBy);
			const bProp = getPropertyByString(b, sortBy);
			if (aProp < bProp) {
				return sortOrder === 'asc' ? -1 : 1;
			} else if (aProp > bProp) {
				return sortOrder === 'asc' ? 1 : -1;
			} else {
				return 0;
			}
		});
		return orderArray;
	}
}
