import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { EditSlotDTO } from 'src/interface/slots';

export const getSlots = () => {
	return http.get(API_URL.SLOTS);
};

export const postSlots = (data: EditSlotDTO) => {
	return http.post(API_URL.SLOTS, data);
};
