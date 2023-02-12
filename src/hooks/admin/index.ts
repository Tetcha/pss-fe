import { useMutation } from '@tanstack/react-query';

import { update, updatePassword } from 'src/api/admin';
import { login } from 'src/api/admin/auth';
import { constant } from 'src/constants/api/token';
import { store } from 'src/store';
import { adminThunk } from 'src/store/admin/thunks';

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

export const useUpdateAdmin = () => {
	const {
		mutate: mutateUpdate,
		mutateAsync: mutateUpdateAsync,
		...rest
	} = useMutation(update, {
		onSuccess: () => {
			store.dispatch(adminThunk.getCurrentAdmin());
		},
	});
	return { mutateUpdate, mutateUpdateAsync, ...rest };
};

export const useUpdateAdminPassword = () => {
	const {
		mutate: mutateUpdatePassword,
		mutateAsync: mutateUpdatePasswordAsync,
		...rest
	} = useMutation(updatePassword, {
		onSuccess: () => {
			store.dispatch(adminThunk.getCurrentAdmin());
		},
	});
	return { mutateUpdatePassword, mutateUpdatePasswordAsync, ...rest };
};
