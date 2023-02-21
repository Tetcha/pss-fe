import { Booking } from 'src/models/booking';
import { Doctor } from 'src/models/doctor';
import { CommonFilterProps } from '../common';

export interface BookingListFilter
	extends CommonFilterProps,
		Pick<Booking, 'status'>,
		Pick<Doctor, 'id'> {}

export interface BookingUpdateStatusDTO extends Pick<Booking, 'status' | 'id'> {}
