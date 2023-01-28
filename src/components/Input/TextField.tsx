import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { CommonFieldProps } from 'src/interface/form';

import CommonFieldWrapper from '../Input/CommonFieldWrapper';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	commonField: CommonFieldProps;
}

export const TextField: React.FC<TextFieldProps> = ({ commonField, ...props }) => {
	const { register } = useFormContext();

	const { name } = commonField;

	return (
		<CommonFieldWrapper {...commonField}>
			<input
				{...register(name)}
				{...props}
				className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</CommonFieldWrapper>
	);
};
