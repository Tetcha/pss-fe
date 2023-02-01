import { Gender } from 'src/interface/common';

export interface Doctor {
	id: string;
	name: string;
	email: string;
	birthday: string;
	phone: string;
	gender: Gender;
	balance: number;
}
