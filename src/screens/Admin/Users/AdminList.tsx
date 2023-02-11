import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAdminList } from 'src/api/admin/list';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { useTableUtil } from 'src/contexts/TableUtilContext';
import { AdminListFilter } from 'src/interface/admin';
import { pagingMapper } from 'src/utils/object.helper';

interface AdminListProps {
	filters: Partial<AdminListFilter>;
}

const AdminList: React.FunctionComponent<AdminListProps> = ({ filters }) => {
	const { setTotalItem } = useTableUtil();

	const query = useQuery(
		['admins', filters],
		async () => {
			console.log(filters);
			const { data } = await getAdminList(pagingMapper(filters));
			// console.log(data);

			setTotalItem(data.count);

			return data;
		},
		{
			initialData: { data: [], count: 0 },
		},
	);

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Admins
					</h2>
				</div>
				{/* <div className="flex mt-4 md:mt-0 md:ml-4">
					<Link href={ROUTES_URL.ADD_ADMIN}>
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Add Admin
						</button>
					</Link>
				</div> */}
			</div>
			<TableBuilder
				data={query.data.data}
				columns={[
					{
						title: () => <TableHeaderCell key="id" sortKey="id" label="ID" />,
						width: 400,
						key: 'id',

						render: ({ ...props }) => {
							return <TableBodyCell key={`id-${props.id}`} label={props.id} />;
						},
					},
					{
						title: () => <TableHeaderCell key="name" sortKey="name" label="Name" />,
						width: 400,
						key: 'name',

						render: ({ ...props }) => {
							return <TableBodyCell key={`${props.id}-${props.name}`} label={props.name} />;
						},
					},
				]}
				rowKey="id"
				isLoading={query.isLoading}
			/>
		</>
	);
};

export default AdminList;
