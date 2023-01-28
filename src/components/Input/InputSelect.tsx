import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectProps } from 'antd';

import { CommonFieldProps } from 'src/interface/form';

import CommonFieldWrapper from './CommonFieldWrapper';

interface InputSelectProps extends SelectProps {
	commonField: CommonFieldProps;
}

export function InputSelect({ commonField, ...props }: InputSelectProps) {
	const { control } = useFormContext();
	const { name } = commonField;

	return (
		<CommonFieldWrapper {...commonField}>
			<Controller
				name={name}
				control={control}
				render={({ field: { value, onChange } }) => (
					<Select
						{...props}
						defaultValue={value}
						onChange={(selectValues) => onChange(selectValues)}
					/>
				)}
			/>
		</CommonFieldWrapper>
	);
}
