import { useMutation } from '@tanstack/react-query';
import { postSymptom } from 'src/api/symptom';

export const useAddSymptom = () => {
	const {
		mutate: mutateAddSymptom,
		mutateAsync: mutateAddSymptomAsync,
		...rest
	} = useMutation(postSymptom);
	return { mutateAddSymptom, mutateAddSymptomAsync, ...rest };
};
