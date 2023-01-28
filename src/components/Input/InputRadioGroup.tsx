import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import { CommonFieldProps, Direction, Option } from 'src/interface/form';

import CommonFieldWrapper from './CommonFieldWrapper';
import { InputRadio } from './InputRadio';

interface InputRadioGroupProps<Label, Value, Key> {
	optionsDirection?: Direction;
	className?: string;
	options?: Option<Label, Value>[];
	defaultChecked?: any;
	commonField: CommonFieldProps<Key>;
}

export function InputRadioGroup<Value, Key = any>({
	optionsDirection = 'row',
	className,
	defaultChecked,
	options,
	commonField,
}: InputRadioGroupProps<string, Value, Key>) {
	const { name } = commonField;
	const { register } = useFormContext();

	React.useEffect(() => {
		register(name);
	}, [name]);

	return (
		<CommonFieldWrapper {...commonField}>
			<div
				className={clsx(
					'flex flex-wrap gap-2',
					{
						'flex-col': optionsDirection === 'column',
					},
					className,
				)}
			>
				{options ? (
					options.map((option) => (
						<InputRadio
							id={`${name}-option-${option.value}`}
							key={`${name}-option-${option.value}`}
							label={option.label}
							value={option.value}
							defaultChecked={option.value === defaultChecked}
							{...register(name)}
						/>
					))
				) : (
					<></>
				)}
			</div>
		</CommonFieldWrapper>
	);
}
