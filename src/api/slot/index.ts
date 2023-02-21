import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { ResponseList } from 'src/interface/common';
import { BookingSlotListFilter, EditSlotDTO, FilterSlotDTO } from 'src/interface/slots';
import { AvailableSlot, BookingSlot } from 'src/models/slot';

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

export const getBookingSlots = (filter: BookingSlotListFilter) => {
	const { id, ...rest } = filter;
	return http.get<ResponseList<BookingSlot>>(API_URL.DOCTOR_BOOKING_SLOTS(id), { params: rest });
};
