import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import { BookingListFilter, BookingUpdateStatusDTO } from 'src/interface/booking';
import { ResponseList } from 'src/interface/common';
import { Booking } from 'src/models/booking';

export const getBooking = (filter: BookingListFilter) => {
	const { id, ...rest } = filter;
	return http.get<ResponseList<Booking>>(API_URL.DOCTOR_BOOKING_SLOTS(id), { params: rest });
};

export const updateBookingStatus = (data: BookingUpdateStatusDTO) => {
	const { id, status } = data;
	return http.put(API_URL.BOOKING_STATUS(id), { status });
};
