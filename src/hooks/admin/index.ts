import { useMutation } from '@tanstack/react-query';

import { login } from 'src/api/admin/auth';
import { constant } from 'src/constants/api/token';

export const useLoginAdmin = () => {
	const {
		mutate: mutateLogin,
		mutateAsync: mutateLoginAsync,
		...rest
	} = useMutation(login, {
		onSuccess: (data) => {
			localStorage.setItem(constant.TOKEN_KEY, data.data.token);
		},
	});
	return { mutateLogin, mutateLoginAsync, ...rest };
};
