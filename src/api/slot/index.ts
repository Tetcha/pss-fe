import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { EditSlotDTO, FilterSlotDTO } from 'src/interface/slot';
import { AvailableSlot } from 'src/models/slot';

export const getSlots = () => {
	return http.get(API_URL.SLOTS);
};

export const postSlots = (data: EditSlotDTO) => {
	return http.post(API_URL.SLOTS, data);
};

export const getDoctorSlots = (data: FilterSlotDTO) => {
	const { id, ...rest } = data;

	return http.get<AvailableSlot[]>(API_URL.SLOTS_DOCTOR(data.id), { params: rest });
};
