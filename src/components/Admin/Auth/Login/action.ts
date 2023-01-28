import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';

import { AuthLoginDto } from './interface';

export const authAdminLogin = async (input: AuthLoginDto) => {
	const res = await http.post(API_URL.LOGIN_ADMIN, input);
	return res;
};
