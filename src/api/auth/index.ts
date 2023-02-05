import { AuthLoginDto } from 'src/components/Auth/Login/interface';
import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';

// import { LoginPayload, RegisterPayload } from 'src/interface/auth';

export const loginApi = (data: AuthLoginDto) => {
	return http.post<string>(API_URL.LOGIN, data);
};

export const logout = () => {
	return http.post(API_URL.LOGOUT);
};
