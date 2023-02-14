import { Moment } from 'moment';
import { Doctor } from 'src/models/doctor';

import { CommonFilterProps, Gender } from './../common';

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

export interface DoctorListFilter
	extends CommonFilterProps,
		Partial<Pick<Doctor, 'phone' | 'username' | 'name'>> {}
