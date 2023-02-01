import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';

// import { AuthLoginDto } from './interface';

export const authLogin = async (input: string) => {
	try {
		const res = await http.post(API_URL.LOGIN, input);
		return res;
	} catch (error) {
		return null;
	}
};
