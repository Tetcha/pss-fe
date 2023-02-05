import { useMutation } from '@tanstack/react-query';

import { loginApi } from 'src/api/auth';

export const useLogin = () => {
	const {
		mutate: mutateLogin,
		mutateAsync: mutateLoginAsync,
		...rest
	} = useMutation(loginApi, {
		onSuccess: (data) => {
			localStorage.setItem('TOKEN_KEY', JSON.stringify(data));
		},
	});
	return { mutateLogin, mutateLoginAsync, ...rest };
};
