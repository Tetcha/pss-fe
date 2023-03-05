import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { AddCategoryDTO } from 'src/interface/category';

export const postCategory = (data: AddCategoryDTO) => {
	return http.post(API_URL.CATEGORY, data);
};
