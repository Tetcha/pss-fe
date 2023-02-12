import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { AdminListFilter } from 'src/interface/admin';
import { ResponseList } from 'src/interface/common';
import { Admin } from 'src/models/admin';

export const getAdminList = (filters: Partial<AdminListFilter>) => {
	return http.get<ResponseList<Admin>>(API_URL.GET_ADMIN_LIST, { params: filters });
};
