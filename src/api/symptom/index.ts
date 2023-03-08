import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { SymptomDTO, SymptomForm } from 'src/interface/symptom';

export const postSymptom = (data: SymptomForm) => {
	return http.post(API_URL.SYMPTOM, data);
};
