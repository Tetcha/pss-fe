import { LoginTokenPayload } from 'src/components/Student/Auth/Login/interface';
import { http } from 'src/config/axios';
import { constant } from 'src/constants/api/token';
import { API_URL } from 'src/constants/api/url';

// import { LoginPayload, RegisterPayload } from 'src/interface/auth';

export const loginApi = (data: LoginTokenPayload) => {
	return http.post<string>(API_URL.LOGIN, data);
};

export const logout = () => {
	localStorage.removeItem(constant.TOKEN_KEY);
	return http.post(API_URL.LOGOUT);
};
