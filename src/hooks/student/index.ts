import { useMutation } from '@tanstack/react-query';
import { updateStudentActive } from 'src/api/admin/status';

export const useUpdateStudentActive = () => {
	const {
		mutate: mutateUpdateDoctorActive,
		mutateAsync: mutateUpdateDoctorActiveAsync,
		...rest
	} = useMutation(updateStudentActive);
	return { mutateUpdateDoctorActive, mutateUpdateDoctorActiveAsync, ...rest };
};
