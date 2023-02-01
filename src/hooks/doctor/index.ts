import { useMutation } from '@tanstack/react-query';

import { addDoctor, login } from '../../api/doctor/auth';

export const useAddDoctor = () => {
	const { mutate: mutateAdd, mutateAsync: mutateAddAsync, ...rest } = useMutation(addDoctor);
	return { mutateAdd, mutateAddAsync, ...rest };
};

export const useLoginDoctor = () => {
	const { mutate: mutateLogin, mutateAsync: mutateLoginAsync, ...rest } = useMutation(login);
	return { mutateLogin, mutateLoginAsync, ...rest };
};
