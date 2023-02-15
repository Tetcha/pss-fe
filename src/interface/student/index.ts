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
