import { http } from 'src/config/axios';

export const logout = async () => {
	try {
		const res = await http.post('/auth/logout');
		return res;
	} catch (error) {
		return null;
	}
};
