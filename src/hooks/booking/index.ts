import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { studentBooking, updateBookingStatus } from 'src/api/booking';

export const useUpdateBookingStatus = () => {
	const {
		mutate: mutateUpdateBookingStatus,
		mutateAsync: mutateUpdateBookingStatusAsync,
		...rest
	} = useMutation(updateBookingStatus, {
		onSuccess: () => {
			toast.success('Update booking status successfully');
		},
	});
	return { mutateUpdateBookingStatus, mutateUpdateBookingStatusAsync, ...rest };
};

export const useStudentBooking = () => {
	const {
		mutate: mutateStudentBooking,
		mutateAsync: mutateStudentBookingAsync,
		...rest
	} = useMutation(studentBooking, {
		onSuccess: () => {
			toast.success('Booking successfully!!');
		},
	});
	return { mutateStudentBooking, mutateStudentBookingAsync, ...rest };
};
