import { Moment } from 'moment';
import { Student } from 'src/models/student';
import { CommonFilterProps } from '../common';

export interface StudentListFilter
	extends CommonFilterProps,
		Partial<Pick<Student, 'name' | 'email' | 'phone' | 'studentCode'>> {}

// export interface UpdateStudentDTO
// 	extends CommonFilterProps,
// 		Partial<
// 			Pick<Student, 'name' | 'studentCode' | 'email' | 'gender' | 'birthday' | 'phone' | 'balance'>
// 		> {}

// export interface StudentBookingForm {
// 	name: string;
// 	birthday: Moment;
// 	nameDoctor: string;
// 	slot: string;
// 	question: string;
// }
