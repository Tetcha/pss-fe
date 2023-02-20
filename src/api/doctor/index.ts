import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { DoctorUpdateDTO } from 'src/interface/doctor';
import { FilterSlotDTO } from 'src/interface/slots';
import { AvailableSlot } from 'src/models/slot';
import { formHelper } from 'src/utils';

export const update = (data: DoctorUpdateDTO) => {
	formHelper.FormParser(data);

	return http.put(API_URL.UPDATE_DOCTOR, data, formHelper.SendFormRequestConfig());
};

export const getDoctorSlots = (data: FilterSlotDTO) => {
	const { id, ...rest } = data;

	return http.get<AvailableSlot[]>(API_URL.SLOTS_DOCTOR(data.id), { params: rest });
};
