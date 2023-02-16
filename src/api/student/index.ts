import { API_URL } from 'src/constants/api/url';
import { http } from 'src/config/axios';
import { StudenUpdatetDTO } from 'src/interface/auth';

export const update = (data: StudenUpdatetDTO) => {
	return http.put(API_URL.UPDATE_STUDENT, data);
};
