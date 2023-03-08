import { ResponseList } from 'src/interface/common';
import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { AddCategoryDTO } from 'src/interface/category';
import { SymptomDTO } from 'src/interface/symptom';

export const postCategory = (data: AddCategoryDTO) => {
	return http.post(API_URL.CATEGORY, data);
};

export const getCategories = (filter: any) => {
	const { ...rest } = filter;
	return http.get<ResponseList<SymptomDTO>>(API_URL.CATEGORIES, {
		params: rest,
	});
};
