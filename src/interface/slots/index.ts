import { Moment } from 'moment';

export interface EditMultiSlotForm {
	dates: Moment[];
	slots: number[];
}

export interface EditSlotForm {
	dates: Moment;
	slots: number[];
}

export interface EditSlotDTO extends Omit<EditMultiSlotForm | EditSlotForm, 'dates'> {
	dates: string[];
}
