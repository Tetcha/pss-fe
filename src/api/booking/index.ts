import { BookingHistory } from './../../models/booking';
import { http } from 'src/config/axios';
import { API_URL } from 'src/constants/api/url';
import {
	BookingHistoryListFilter,
	BookingListFilter,
	BookingUpdateStatusDTO,
	StudentBookingForm,
} from 'src/interface/booking';
import { ResponseList } from 'src/interface/common';
import { Booking } from 'src/models/booking';
import { useStoreUser } from 'src/store';

export const getBooking = (filter: BookingListFilter) => {
	const { id, ...rest } = filter;
	return http.get<ResponseList<Booking>>(API_URL.DOCTOR_BOOKING_SLOTS(id), { params: rest });
};

export const updateBookingStatus = (data: BookingUpdateStatusDTO) => {
	const { id, status } = data;
	return http.put(API_URL.BOOKING_STATUS(id), { status });
};

export const studentBooking = (data: StudentBookingForm) => {
	return http.post<string>(API_URL.STUDENT_BOOKING, data);
};

export const getStudentBookingHistory = (filter: BookingHistoryListFilter) => {
	const { id, ...rest } = filter;
	return http.get<ResponseList<BookingHistory>>(API_URL.STUDENT_BOOKING_HISTORY(id), {
		params: rest,
	});
};
