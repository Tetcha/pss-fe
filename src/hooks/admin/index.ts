import { useMutation } from '@tanstack/react-query';

import { login } from 'src/api/admin/auth';

export const useLoginAdmin = () => {
	const { mutate: mutateLogin, mutateAsync: mutateLoginAsync, ...rest } = useMutation(login);
	return { mutateLogin, mutateLoginAsync, ...rest };
};
