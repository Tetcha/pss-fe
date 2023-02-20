import { Moment } from 'moment';
import { Doctor } from 'src/models/doctor';

import { CommonFilterProps, Gender } from './../common';

export interface DoctorUpdateForm extends Pick<Doctor, 'name' | 'briefInfo' | 'phone' | 'gender'> {
	image?: File | null;
	birthday: Moment;
}

export interface DoctorUpdateDTO extends Omit<DoctorUpdateForm, 'birthday'> {
	birthday: string;
}

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

export interface DoctorListFilterForStudent extends DoctorListFilter {
	gender: Gender;
	isActive: Boolean;
}
