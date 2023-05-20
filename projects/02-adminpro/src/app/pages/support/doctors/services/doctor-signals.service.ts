import { Injectable, signal } from '@angular/core';
import { Doctor } from 'projects/02-adminpro/src/app/shared/models/mongo-models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorSignalsService {

	public closeModal = signal({
		success : false,
		data : undefined as Doctor | undefined
	});


  constructor() { }
}
