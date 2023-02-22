import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateBookingStatus } from 'src/api/booking';

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
