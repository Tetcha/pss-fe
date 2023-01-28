import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { LoginPayload, RegisterPayload } from 'src/interface/auth';

export const login = (data: LoginPayload) => {
	return http.post(API_URL.LOGIN, data);
};

export const register = (data: RegisterPayload) => {
	return http.post(API_URL.REGISTER, data);
};
