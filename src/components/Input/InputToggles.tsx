import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Switch, SwitchProps } from 'antd';

import { CommonFieldProps } from 'src/interface/form';

import CommonFieldWrapper from './CommonFieldWrapper';

interface InputTogglesProps extends SwitchProps {
	commonField: CommonFieldProps;
}

export const InputToggles: React.FunctionComponent<InputTogglesProps> = ({
	commonField,
	...props
}) => {
	const { control } = useFormContext();
	const { name } = commonField;

	return (
		<CommonFieldWrapper {...commonField}>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange } }) => (
					<Switch {...props} onChange={(value) => onChange(value)} />
				)}
			/>
		</CommonFieldWrapper>
	);
};
