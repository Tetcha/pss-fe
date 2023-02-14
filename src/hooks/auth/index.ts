import { useMutation } from '@tanstack/react-query';

import { loginApi } from 'src/api/auth';

import { constant } from './../../constants/api/token';

export const useLogin = () => {
	const {
		mutate: mutateLogin,
		mutateAsync: mutateLoginAsync,
		...rest
	} = useMutation(loginApi, {
		onSuccess: (data) => {
			console.log('data.token', data.data);
			localStorage.setItem(constant.TOKEN_KEY, data.data);
		},
	});
	return { mutateLogin, mutateLoginAsync, ...rest };
};
