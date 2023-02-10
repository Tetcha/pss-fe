import * as React from 'react';
import Link from 'next/link';
import _get from 'lodash.get';

import { TableBodyCell } from 'src/components/Tables/TableBodyCell';
import { TableBuilder } from 'src/components/Tables/TableBuilder';
import { TableHeaderCell } from 'src/components/Tables/TableHeaderCell';
import { ROUTES_URL } from 'src/constants/routes';

interface UsersProps {}

const Users: React.FunctionComponent<UsersProps> = () => {
	// const [data, setData] = React.useState<User[]>([]);

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Users
					</h2>
				</div>
				<div className="flex mt-4 md:mt-0 md:ml-4">
					<Link href={ROUTES_URL.ADD_DOCTOR}>
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Add Doctor
						</button>
					</Link>
				</div>
			</div>
			<TableBuilder
				data={[]}
				columns={[
					{
						title: () => <TableHeaderCell key="name" sortKey="name" label="Name" />,
						width: 200,
						key: 'name',

						render: ({ ...props }) => {
							const index: number = _get(props, 'row.index', 0);
							const data = _get(props, `data[${index}].name`, 'unknown');

							return <TableBodyCell key={data} label={data} />;
						},
					},
					{
						title: () => <TableHeaderCell key="phone" sortKey="phone" label="Phone" />,
						key: 'phone',
						render: ({ ...props }) => {
							const index: number = _get(props, 'row.index', 0);
							const data = _get(props, `data[${index}].phone`, 'unknown');

							return <TableBodyCell key={data} label={data} />;
						},
					},

					{
						title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
						key: 'status',
						render: ({ ...props }) => {
							const index: number = _get(props, 'row.index', 0);
							return <TableBodyCell label={''} />;
						},
					},
					{
						title: () => <TableHeaderCell key="email" sortKey="email" label="" />,
						key: 'action',

						render: ({ ...props }) => {
							return <p></p>;
						},
					},
				]}
				rowKey="id"
				isLoading={false}
			/>
			{/* <TablePagination /> */}
		</>
	);
};

export default Users;
