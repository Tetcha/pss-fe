import { useMutation } from '@tanstack/react-query';
import { updateDoctorActive } from 'src/api/admin/status';

import { constant } from 'src/constants/api/token';

import { addDoctor, login } from '../../api/doctor/auth';

export const useAddDoctor = () => {
	const { mutate: mutateAdd, mutateAsync: mutateAddAsync, ...rest } = useMutation(addDoctor);
	return { mutateAdd, mutateAddAsync, ...rest };
};

export const useLoginDoctor = () => {
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

export const useUpdateDoctorActive = () => {
	const {
		mutate: mutateUpdateDoctorActive,
		mutateAsync: mutateUpdateDoctorActiveAsync,
		...rest
	} = useMutation(updateDoctorActive);
	return { mutateUpdateDoctorActive, mutateUpdateDoctorActiveAsync, ...rest };
};
