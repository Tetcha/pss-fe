import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import _get from 'lodash.get';

import StatusTag from 'src/components/Common/StatusTag';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { ROUTES_URL } from 'src/constants/routes';
import { Gender } from 'src/interface/common';
import { Doctor } from 'src/models/doctor';

interface DoctorListProps {}

const DoctorList: React.FunctionComponent<DoctorListProps> = () => {
	const query = useQuery(
		['doctors'],
		async () => {
			const res = {
				data: [
					{
						id: '1',
						name: 'John Doe',
						email: 'example@gmail.com',
						balance: 100,
						birthday: '01/01/1990',
						gender: Gender.MALE,
						phone: '0123456789',
					},
					{
						id: '2',
						name: 'John Doe',
						email: 'example@gmail.com',
						balance: 100,
						birthday: '01/01/1990',
						gender: Gender.MALE,
						phone: '0123456789',
					},
					{
						id: '3',
						name: 'John Doe',
						email: 'example@gmail.com',
						balance: 100,
						birthday: '01/01/1990',
						gender: Gender.MALE,
						phone: '0123456789',
					},
				],
				count: 3,
			};
			return res;
		},
		{ initialData: { data: [], count: 0 } },
	);

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Doctors
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
			<TableBuilder<Doctor>
				data={query.data.data}
				columns={[
					{
						title: () => <TableHeaderCell key="name" sortKey="name" label="Name" />,
						width: 200,
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
							const data = _get(props, `data[${index}].email`, 'unknown');

							return <TableBodyCell key={`${props.id}-${props.email}`} label={props.email} />;
						},
					},
					{
						title: () => <TableHeaderCell key="phone" sortKey="phone" label="Phone" />,
						key: 'phone',
						render: ({ ...props }) => {
							return <TableBodyCell key={`${props.id}-${props.phone}`} label={props.phone} />;
						},
					},
					{
						title: () => <TableHeaderCell key="gender" sortKey="gender" label="Gender" />,
						key: 'gender',

						render: ({ ...props }) => {
							return <TableBodyCell key={`${props.id}-${props.gender}`} label={props.gender} />;
						},
					},

					{
						title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
						key: 'status',
						render: ({ ...props }) => {
							return <StatusTag value={'Active'} key={`${props.id}-${props.status}`} />;
						},
					},
					{
						title: () => <TableHeaderCell key="email" sortKey="email" label="" />,
						key: 'action',

						render: ({ ...props }) => {
							return (
								<div className="flex gap-2">
									<Link href={'#'}>
										<p className="text-blue-600">Edit</p>
									</Link>
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

export default DoctorList;
