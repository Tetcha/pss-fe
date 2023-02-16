import { Moment } from 'moment';
import { Gender } from '../common';

export interface LoginPayload {
	username: string;
	password: string;
}

export interface StudentUpdateForm {
	name?: string;
	studentCode?: string;
	email?: string;
	gender?: Gender;
	birthday?: Moment;
	phone?: string;
}

export interface StudentUpdatetDTO extends StudentUpdateForm {}
// export interface StudentUpdatetDTO extends Omit<StudentUpdateForm, 'birthday'> {
// 	birthday: string;
// }
