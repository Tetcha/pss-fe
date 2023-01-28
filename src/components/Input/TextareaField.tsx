import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea';

import { CommonFieldProps } from 'src/interface/form';

import CommonFieldWrapper from './CommonFieldWrapper';

interface TextareaFieldProps extends TextAreaProps {
	commonField: CommonFieldProps;
}

export const TextareaField = ({ commonField, ...props }: TextareaFieldProps) => {
	const { control } = useFormContext();
	const { name } = commonField;

	return (
		<CommonFieldWrapper {...commonField}>
			<Controller name={name} control={control} render={() => <TextArea {...props} />} />
		</CommonFieldWrapper>
	);
};
