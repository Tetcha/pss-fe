import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';

import { AdminPasswordDTO, AdminUpdateDTO } from './../../interface/admin/index';

export const update = (data: AdminUpdateDTO) => {
	return http.put(API_URL.UPDATE_ADMIN, data);
};

export const updatePassword = (data: AdminPasswordDTO) => {
	return http.put(API_URL.UPDATE_ADMIN_PASSWORD, data);
};
