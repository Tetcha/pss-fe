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
