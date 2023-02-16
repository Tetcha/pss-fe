import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { DoctorUpdateDTO } from 'src/interface/doctor';
import { formHelper } from 'src/utils';

export const update = (data: DoctorUpdateDTO) => {
	formHelper.FormParser(data);

	return http.put(API_URL.UPDATE_DOCTOR, data, formHelper.SendFormRequestConfig());
};
