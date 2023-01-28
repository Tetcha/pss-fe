import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Slider, SliderSingleProps } from 'antd';

import { CommonFieldProps } from 'src/interface/form';

import CommonFieldWrapper from './CommonFieldWrapper';

interface InputSingleSliderProps extends SliderSingleProps {
	commonField: CommonFieldProps;
}

export const InputSingleSlider: React.FC<InputSingleSliderProps> = ({
	commonField,
	...props
}: InputSingleSliderProps) => {
	const { setValue, register, control, getValues } = useFormContext();
	const { name } = commonField;

	const [input, setInput] = React.useState<number>(props.defaultValue || 0);

	React.useEffect(() => {
		register(name);
		const value = getValues(name);
		if (value) {
			console.log(value);
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
				render={() => <Slider {...props} onChange={(value) => setInput(value)} />}
			/>
		</CommonFieldWrapper>
	);
};
