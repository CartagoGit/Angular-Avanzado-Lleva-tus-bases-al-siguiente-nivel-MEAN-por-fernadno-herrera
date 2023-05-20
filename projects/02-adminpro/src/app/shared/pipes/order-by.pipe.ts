import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
	transform(array: any[], sortBy: string, order?: 'asc' | 'desc'): any[] {
		console.log(array);
		const sortOrder = order ? order : 'asc'; // setting default ascending order
		const orderArray = [...array].sort((a: any, b: any) => {
			if (a[sortBy] < b[sortBy]) {
				return sortOrder === 'asc' ? -1 : 1;
			} else if (a[sortBy] > b[sortBy]) {
				return sortOrder === 'asc' ? 1 : -1;
			} else {
				return 0;
			}
		});
		return orderArray;
	}
}
