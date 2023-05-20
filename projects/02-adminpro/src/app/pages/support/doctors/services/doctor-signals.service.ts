import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorSignalsService {

	public closeModal = signal({
		success : false,
	});


  constructor() { }
}
