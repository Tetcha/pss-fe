import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { LoginPayload } from 'src/interface/auth';

export const login = (data: LoginPayload) => {
	return http.post(API_URL.LOGIN_ADMIN, data);
};
