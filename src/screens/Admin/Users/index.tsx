import * as React from 'react';
import DashboardLayout from 'src/components/Admin/Layout/DashboardLayout';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { ROUTES_URL } from 'src/constants/routes';

interface UsersProps {}

interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <p>{text}</p>,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: (_, { tags }) => (
			<>
				{tags.map((tag) => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<Link href={'#'}>Edit</Link>
				<Link href={'#'}>Delete</Link>
			</Space>
		),
	},
];

const defaultData: DataType[] = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];

const Users: React.FunctionComponent<UsersProps> = () => {
	const [data, setData] = React.useState<DataType[]>(defaultData);

	return (
		<DashboardLayout>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Back End Developer
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
			<Table columns={columns} dataSource={data} />
		</DashboardLayout>
	);
};

export default Users;
