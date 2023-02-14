import { useMutation } from '@tanstack/react-query';
import { postSlots } from 'src/api/slot';

export const usePostSlots = () => {
	const {
		mutate: mutatePostSlots,
		mutateAsync: mutatePostSlotsAsync,
		...rest
	} = useMutation(postSlots);
	return { mutatePostSlots, mutatePostSlotsAsync, ...rest };
};
