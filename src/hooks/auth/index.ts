import { useMutation } from '@tanstack/react-query';
import { update } from 'src/api/student';

import { loginApi } from 'src/api/student/auth';
import { store } from 'src/store';
import { userThunk } from 'src/store/user/thunks';
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

export const useUpdateStudent = () => {
	const {
		mutate: mutateUpdate,
		mutateAsync: mutateUpdateAsync,
		...rest
	} = useMutation(update, {
		onSuccess: () => {
			store.dispatch(userThunk.getCurrentUser());
		},
	});
	return { mutateUpdate, mutateUpdateAsync, ...rest };
};
