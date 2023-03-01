import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postSlots } from 'src/api/slot';

export const usePostSlots = () => {
	const {
		mutate: mutatePostSlots,
		mutateAsync: mutatePostSlotsAsync,
		...rest
	} = useMutation(postSlots, {
		onSuccess: () => {
			toast.success('Create successfully');
		},
	});
	return { mutatePostSlots, mutatePostSlotsAsync, ...rest };
};
