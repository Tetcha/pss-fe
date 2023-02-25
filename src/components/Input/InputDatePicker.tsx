import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, DatePickerProps } from 'antd';

import { CommonFieldProps } from 'src/interface/form';

import CommonFieldWrapper from './CommonFieldWrapper';

interface InputDatePickerProps {
	commonField: CommonFieldProps;
	options?: DatePickerProps;
	disable?: true | false;
}

const InputDatePicker: React.FunctionComponent<InputDatePickerProps> = ({
	commonField,
	options,
	disable,
}) => {
	const { control } = useFormContext();
	const { name } = commonField;

	return (
		<CommonFieldWrapper {...commonField}>
			<Controller
				name={name}
				control={control}
				render={({ field: { value, onChange } }) => (
					<DatePicker
						className="w-full"
						onChange={onChange}
						value={value}
						{...options}
						disabled={disable}
					/>
				)}
			/>
		</CommonFieldWrapper>
	);
};

export default InputDatePicker;
