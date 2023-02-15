import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { UpdateStatusDTO } from 'src/interface/common';

export const updateDoctorActive = (data: UpdateStatusDTO) => {
	const { id, isActive } = data;
	return http.put(API_URL.UPDATE_DOCTOR_ACTIVE(id, isActive));
};

export const updateStudentActive = (data: UpdateStatusDTO) => {
	const { id, isActive } = data;
	return http.put(API_URL.UPDATE_STUDENT_ACTIVE(id, isActive));
};
