import { Doctor } from './doctor';

export interface Slot {
	id: number;
	name: string;
	startTime: string;
	endTime: string;
}

export interface AvailableSlot extends Omit<Slot, 'id' | 'name'> {
	id: string;
	status: boolean;
	date: string;
	doctor: Doctor;
}
