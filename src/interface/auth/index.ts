import { Moment } from 'moment';
import { Gender } from '../common';
import { Student } from 'src/models/student';
export interface LoginPayload {
	username: string;
	password: string;
}

export interface StudentUpdateForm
	extends Pick<Student, 'name' | 'studentCode' | 'email' | 'gender' | 'phone'> {
	image?: File | null;
	birthday: Moment;
}

export interface StudentUpdatetDTO extends StudentUpdateForm {}
// export interface StudentUpdatetDTO extends Omit<StudentUpdateForm, 'birthday'> {
// 	birthday: string;
// }
