import { Moment } from 'moment';

import { Gender } from './../common';

export interface AddDoctorForm {
	name: string;
	email: string;
	phone: string;
	birthday: Moment;
	password: string;
	confirmPassword: string;
	gender: Gender;
}

export interface AddDoctorDTO extends Omit<AddDoctorForm, 'birthday'> {
	birthday: string;
}
