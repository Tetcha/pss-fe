import { useMutation } from '@tanstack/react-query';

import { login, register } from 'src/api/auth';

export const useLogin = () => {
	const { mutate: mutateLogin, mutateAsync: mutateLoginAsync, ...rest } = useMutation(login);
	return { mutateLogin, mutateLoginAsync, ...rest };
};

export const useRegister = () => {
	const {
		mutate: mutateRegister,
		mutateAsync: mutateRegisterAsync,
		...rest
	} = useMutation(register);
	return { mutateRegister, mutateRegisterAsync, ...rest };
};
