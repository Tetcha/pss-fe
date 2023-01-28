import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Slider } from 'antd';
import { SliderRangeProps } from 'antd/lib/slider';

import { CommonFieldProps } from 'src/interface/form';

import CommonFieldWrapper from './CommonFieldWrapper';

interface InputRangeSliderProps extends Omit<SliderRangeProps, 'range'> {
	commonField: CommonFieldProps;
}

export const InputRangeSlider: React.FC<InputRangeSliderProps> = ({
	commonField,
	...props
}: InputRangeSliderProps) => {
	const { setValue, register, control, getValues } = useFormContext();
	const { name } = commonField;

	const [input, setInput] = React.useState<[number, number]>(props.defaultValue || [0, 0]);

	React.useEffect(() => {
		register(name);
		const value = getValues(name);
		if (value) {
			setValue(name, value);
		}
	}, []);

	React.useEffect(() => {
		setValue(name, input);
	}, [input]);

	return (
		<CommonFieldWrapper {...commonField}>
			<Controller
				name={name}
				control={control}
				render={() => <Slider range={true} {...props} onChange={(value) => setInput(value)} />}
			/>
		</CommonFieldWrapper>
	);
};
