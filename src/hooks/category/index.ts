import { useMutation } from '@tanstack/react-query';
import { postCategory } from 'src/api/category';

export const useAddCategory = () => {
	const { mutate: mutateAdd, mutateAsync: mutateAddAsync, ...rest } = useMutation(postCategory);
	return { mutateAdd, mutateAddAsync, ...rest };
};
