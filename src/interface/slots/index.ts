import { Moment } from 'moment';

export interface EditMultiSlotForm {
	date: Moment[];
	slots: string[];
}

export interface EditSlotForm {
	date: Moment;
	slots: string[];
}

export interface EditSlotDTO extends Omit<EditMultiSlotForm | EditSlotForm, 'date'> {
	date: string[];
}
