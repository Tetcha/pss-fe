import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import { CommonFieldProps, Direction, Option } from 'src/interface/form';

import CommonFieldWrapper from './CommonFieldWrapper';
import { InputCheckBox } from './InputCheckBox';
import { Col, Row } from 'antd';

interface InputCheckboxGroupProps<Label, Value, Key> {
	commonField: CommonFieldProps<Key>;
	optionsDirection?: Direction;
	className?: string;
	options?: Option<Label, Value>[];
	defaultChecked?: any[];
}

export function InputCheckboxGroup<Value, Key = any>({
	commonField,
	optionsDirection = 'row',
	className,
	defaultChecked,
	options,
}: InputCheckboxGroupProps<string, Value, Key>) {
	const { name } = commonField;

	const { register } = useFormContext();

	React.useEffect(() => {
		register(name);
	}, [name, register]);
	return (
		<CommonFieldWrapper {...commonField}>
			{/* <div
				className={clsx(
					'flex flex-wrap gap-2 ',
					{
						'flex-col w-full items-start': optionsDirection === 'column',
					},
					className,
				)}
			> */}
			<Row gutter={[16, 16]} justify="start">
				{options ? (
					options.map((option) => (
						<Col span={8} className={'flex justify-start'} key={`${name}-option-${option.value}`}>
							<InputCheckBox
								id={`${name}-option-${option.value}`}
								label={option.label}
								value={option.value}
								defaultChecked={defaultChecked?.includes(option.value)}
								{...register(name)}
							/>
						</Col>
					))
				) : (
					<></>
				)}
			</Row>
			{/* </div> */}
		</CommonFieldWrapper>
	);
}
