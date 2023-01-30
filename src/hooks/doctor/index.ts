import { addDoctor } from './../../api/admin/doctor';
import { useMutation } from '@tanstack/react-query';

export const useAddDoctor = () => {
	const { mutate: mutateAdd, mutateAsync: mutateAddAsync, ...rest } = useMutation(addDoctor);
	return { mutateAdd, mutateAddAsync, ...rest };
};
