import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { ResponseList } from 'src/interface/common';
import { SymptomForm, SymptomsList } from 'src/interface/symptom';

export const postSymptom = (data: SymptomForm) => {
	return http.post(API_URL.SYMPTOM, data);
};

export const getSymptoms = (filter: any) => {
	const { ...rest } = filter;
	return http.get<ResponseList<SymptomsList>>(API_URL.SYMPTOMS, {
		params: rest,
	});
};
