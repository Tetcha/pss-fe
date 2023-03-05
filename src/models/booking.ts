import { Moment } from 'moment';
import { Student } from 'src/models/student';
import { Doctor } from './doctor';
import { Slot } from './slot';

export interface Booking {
	id: string;
	slot: Slot;
	status: BookingSlotStatus;
}

export enum BookingSlotStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	REJECTED = 'REJECTED',
}

export interface SlotHistory extends Pick<Slot, 'startTime' | 'endTime'> {
	doctor: Doctor;
	date: Moment;
}

export interface BookingHistory extends Pick<Booking, 'id' | 'status'> {
	cost: number;
	slot: SlotHistory;
	student: Student;
}
