import { Moment } from 'moment';
import { Booking } from 'src/models/booking';
import { Doctor } from 'src/models/doctor';
import { CommonFilterProps } from '../common';

export interface BookingListFilter
	extends CommonFilterProps,
		Pick<Booking, 'status'>,
		Pick<Doctor, 'id'> {}

export interface BookingUpdateStatusDTO extends Pick<Booking, 'status' | 'id'> {}

export interface StudentBookingForm {
	slotId: string;
}

export interface StudentBookingDTO {
	name: string;
	birthday: Moment;
	date: Moment;
	nameDoctor: string;
	slotId: string;
	question: string;
}
