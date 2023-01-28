import * as React from 'react';
import clsx from 'clsx';

interface InputRadioProps {
	id?: string;
	defaultChecked?: boolean;
	value?: any;
	label: string;
	direction?: 'row' | 'column';
	className?: string;
}

export const InputRadio: React.FunctionComponent<InputRadioProps> = React.forwardRef(function Radio(
	{ id, defaultChecked = false, direction = 'row', label, className, value, ...props },
	ref: React.ForwardedRef<HTMLInputElement>,
) {
	return (
		<div
			className={clsx(
				'flex gap-1 justify-center items-center',
				{
					'flex-col': direction === 'column',
				},
				className,
			)}
		>
			<input
				ref={ref}
				id={id}
				{...props}
				type="radio"
				defaultChecked={defaultChecked}
				value={value}
				className={clsx('w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500', className)}
			/>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
		</div>
	);
});
