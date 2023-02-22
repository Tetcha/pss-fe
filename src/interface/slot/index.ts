import { Moment } from 'moment';

export interface EditMultiSlotForm {
	dates: Moment[];
	slots: number[];
}

export interface EditSlotForm {
	dates: Moment;
	slots: number[];
}

export interface SlotForm {
	date: Moment;
	slots: any;
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
