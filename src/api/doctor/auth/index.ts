import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { LoginPayload } from 'src/interface/auth';
import { AddDoctorDTO } from 'src/interface/doctor';

export const addDoctor = (data: AddDoctorDTO) => {
	return http.post(API_URL.DOCTOR, data);
};

export const login = (data: LoginPayload) => {
	return http.post(API_URL.LOGIN_DOCTOR, data);
};
