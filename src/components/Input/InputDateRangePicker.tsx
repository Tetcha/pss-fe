import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TimeRangePickerProps, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

import { CommonFieldProps } from 'src/interface/form';

import CommonFieldWrapper from './CommonFieldWrapper';

interface InputDateRangePickerProps {
	commonField: CommonFieldProps;
	options?: TimeRangePickerProps;
}

const InputDateRangePicker: React.FunctionComponent<InputDateRangePickerProps> = ({
	commonField,
	options,
}) => {
	const { control } = useFormContext();
	const { name } = commonField;

	return (
		<CommonFieldWrapper {...commonField}>
			<Controller
				name={name}
				control={control}
				render={({ field: { value, onChange } }) => (
					<RangePicker {...options} onChange={onChange} value={value} />
				)}
			/>
		</CommonFieldWrapper>
	);
};

export default InputDateRangePicker;
