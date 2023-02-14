import { StudentListFilter } from './../../../interface/student/index';
import { DoctorListFilter } from './../../../interface/doctor/index';
import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { AdminListFilter } from 'src/interface/admin';
import { ResponseList } from 'src/interface/common';
import { Admin } from 'src/models/admin';
import { Doctor } from 'src/models/doctor';
import { Student } from 'src/models/student';

export const getAdminList = (filters: Partial<AdminListFilter>) => {
	return http.get<ResponseList<Admin>>(API_URL.GET_ADMIN_LIST, { params: filters });
};

export const getDoctorList = (filters: Partial<DoctorListFilter>) => {
	return http.get<ResponseList<Doctor>>(API_URL.GET_DOCTOR_LIST, { params: filters });
};

export const getStudentList = (filters: Partial<StudentListFilter>) => {
	return http.get<ResponseList<Student>>(API_URL.GET_STUDENT_LIST, { params: filters });
};
