import { Injectable, signal } from '@angular/core';
import { Doctor } from 'projects/02-adminpro/src/app/shared/models/mongo-models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorSignalsService {

	// ANCHOR : Variables
	public closeModal = signal({
		success : false,
		data : undefined as Doctor | undefined
	});

// ANCHOR : Constructor
  constructor() { }

// ANCHOR : Methods

}
