import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { AdminListFilter } from 'src/interface/admin';

export const getAdminList = (filter: AdminListFilter) => {
	return http.get(API_URL.GET_ADMIN_LIST, { params: filter });
};
