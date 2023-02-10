import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { LoginPayload } from 'src/interface/auth';

export const authLogin = async (input: LoginPayload) => {
	try {
		const res = await http.post(API_URL.LOGIN, input);
		return res;
	} catch (error) {
		return null;
	}
};
