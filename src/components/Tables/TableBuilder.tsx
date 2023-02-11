import Table, { ColumnsType } from 'antd/lib/table';

import { useTableUtil } from 'src/contexts/TableUtilContext';
interface TableBuilderProps<T extends object> {
	data: T[];
	columns: ColumnsType<T>;
	isLoading: boolean;
	rowKey: string;
}

export const TableBuilder = <T extends object>({
	data,
	columns,
	rowKey,
	isLoading,
}: TableBuilderProps<T>) => {
	const { totalItem, currentPage, handleOnChangePage } = useTableUtil();

	return (
		<Table
			rowKey={rowKey}
			dataSource={data}
			columns={columns}
			locale={{
				emptyText: 'Empty Data',
			}}
			loading={isLoading}
			pagination={{
				total: totalItem,
				current: Number(currentPage + 1),
			}}
			onChange={(pagination) =>
				handleOnChangePage((pagination.current || 0) - 1, pagination.pageSize || 10)
			}
		/>
	);
};
