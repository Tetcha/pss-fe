import { Booking } from 'src/models/booking';
import { Doctor } from './doctor';

export interface Slot {
	id: number;
	name: string;
	startTime: string;
	endTime: string;
	date?: string;
}

export interface AvailableSlot extends Omit<Slot, 'id' | 'name'> {
	id: string;
	status: boolean;
	date: string;
	doctor: Doctor;
	slotEnumId: number;
	booking: Booking[];
}
