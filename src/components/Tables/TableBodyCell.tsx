import * as React from 'react';

interface TableBodyCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
	label: string | React.ReactElement;
}

export const TableBodyCell: React.FC<TableBodyCellProps> = ({ label, className, ...reset }) => {
	return (
		<div
			className={`px-3 py-4 text-sm whitespace-nowrap first:pl-6 first:pr-3 last:pr-6 last:pl-3  ${className}`}
			{...reset}
		>
			{label}
		</div>
	);
};
