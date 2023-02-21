import { Moment } from 'moment';
import { Doctor } from 'src/models/doctor';
import { BookingSlot, Slot } from 'src/models/slot';
import { CommonFilterProps } from '../common';

export interface EditMultiSlotForm {
	dates: Moment[];
	slots: number[];
}

export interface EditSlotForm {
	dates: Moment;
	slots: number[];
}

export interface FilterSlotForm {
	id: string;
	from: Moment;
	to: Moment;
}

export interface FilterSlotDTO extends Omit<FilterSlotForm, 'from' | 'to'> {
	from: string;
	to: string;
}

export interface EditSlotDTO extends Omit<EditMultiSlotForm | EditSlotForm, 'dates'> {
	dates: string[];
}

export interface BookingSlotListFilter
	extends CommonFilterProps,
		Pick<BookingSlot, 'status'>,
		Pick<Doctor, 'id'> {}
