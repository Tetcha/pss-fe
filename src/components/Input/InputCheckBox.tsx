import * as React from 'react';
import clsx from 'clsx';

interface InputCheckBoxProps {
	id?: string;
	defaultChecked?: boolean;
	value?: any;
	label: string;
	direction?: 'row' | 'column';
	className?: string;
}

export const InputCheckBox: React.FunctionComponent<InputCheckBoxProps> = React.forwardRef(
	function CheckBox(
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
					type="checkbox"
					defaultChecked={defaultChecked}
					value={value}
					className={clsx(
						'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
						className,
					)}
				/>
				<label htmlFor={id} className="block text-sm font-medium text-gray-700">
					{label}
				</label>
			</div>
		);
	},
);
