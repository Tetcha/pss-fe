import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import _get from 'lodash.get';

import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { ROUTES_URL } from 'src/constants/routes';
import { Admin } from 'src/models/admin';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTableUtil } from 'src/contexts/TableUtilContext';
const { confirm } = Modal;

interface AdminListProps {}

const AdminList: React.FunctionComponent<AdminListProps> = () => {
	const { setTotalItem } = useTableUtil();

	const query = useQuery(
		['admins'],
		async () => {
			setTotalItem(3);
			const res = {
				data: [
					{
						id: '1',
						name: 'John Doe',
						email: 'example@gmail.com',
					},
					{
						id: '2',
						name: 'John Doe',
						email: 'example@gmail.com',
					},
					{
						id: '3',
						name: 'John Doe',
						email: 'example@gmail.com',
					},
				],
				count: 3,
			};
			return res;
		},
		{ initialData: { data: [], count: 0 } },
	);

	const onDelete = (id: string) => {
		confirm({
			title: 'Do you want to delete these items?',
			icon: <ExclamationCircleOutlined />,
			content: 'When clicked the OK button, this dialog will be closed after 1 second',
		});
	};

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Admins
					</h2>
				</div>
				<div className="flex mt-4 md:mt-0 md:ml-4">
					<Link href={ROUTES_URL.ADD_ADMIN}>
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Add Admin
						</button>
					</Link>
				</div>
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
					{
						title: () => <TableHeaderCell key="email" sortKey="email" label="Email" />,
						key: 'email',

						render: ({ ...props }) => {
							const index: number = _get(props, 'row.index', 0);

							return <TableBodyCell key={`${props.id}-${props.email}`} label={props.email} />;
						},
					},

					{
						title: () => <TableHeaderCell key="email" sortKey="email" label="" />,
						key: 'action',

						render: ({ ...props }) => {
							return (
								<div className="flex items-center gap-4">
									<Link href={'#'}>
										<p className="my-0 text-blue-600">Edit</p>
									</Link>
									<Button danger onClick={() => onDelete(props.id)}>
										Delete
									</Button>
								</div>
							);
						},
					},
				]}
				rowKey="id"
				isLoading={query.isLoading}
			/>
			{/* <TablePagination /> */}
		</>
	);
};

export default AdminList;
