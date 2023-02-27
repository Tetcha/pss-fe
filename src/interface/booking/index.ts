import { User } from './../../models/user';
import { Moment } from 'moment';
import { Booking } from 'src/models/booking';
import { Doctor } from 'src/models/doctor';
import { CommonFilterProps } from '../common';

export interface BookingListFilter
	extends CommonFilterProps,
		Pick<Booking, 'status'>,
		Pick<Doctor, 'id'> {}

export interface BookingUpdateStatusDTO extends Pick<Booking, 'status' | 'id'> {}

export interface BookingHistoryListFilter
	extends CommonFilterProps,
		Pick<Booking, 'status'>,
		Pick<User, 'id'> {}

export interface StudentBookingForm {
	slotId: string;
	questionContent: Array<any>;
}

export interface StudentBookingDTO {
	name: string;
	date: Moment;
	nameDoctor: string;
	slotId: string;
	questionContent: Array<any>;
}
