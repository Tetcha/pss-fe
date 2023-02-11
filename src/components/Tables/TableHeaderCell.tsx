import * as React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

import { SortOrder, useTableUtil } from 'src/contexts/TableUtilContext';

interface TableHeaderCellProps extends React.DetailedHTMLProps<React.ThHTMLAttributes<any>, any> {
	label: string;
	sortKey?: string;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
	label,
	sortKey,
	className,
	...rest
}) => {
	const { orderBy, order, handleOnChangeOrderFiled } = useTableUtil();

	return (
		<div
			className={`  ${className}`}
			{...rest}
			onClick={() => {
				if (sortKey) handleOnChangeOrderFiled(sortKey);
			}}
		>
			<div className="relative inline-block">
				{label}
				{Boolean(sortKey && label) && (
					<div className="absolute top-0 left-full">
						{orderBy === sortKey &&
							(order === SortOrder.ASC ? (
								<ChevronUpIcon className="inline-block w-4 h-4 ml-1" />
							) : (
								<ChevronDownIcon className="inline-block w-4 h-4 ml-1" />
							))}
					</div>
				)}
			</div>
		</div>
	);
};
