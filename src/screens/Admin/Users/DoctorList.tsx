import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import _get from 'lodash.get';

import StatusTag from 'src/components/Common/StatusTag';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { ROUTES_URL } from 'src/constants/routes';
import { getDoctorList } from 'src/api/admin/list';
import { DoctorListFilter } from 'src/interface/doctor';
import { pagingMapper } from 'src/utils/object.helper';
import { useTableUtil } from 'src/contexts/TableUtilContext';
import { Button, Col, Row } from 'antd';
import FormFilterWrapper from 'src/components/Input/FormFilterWrapper';
import { TextField } from 'src/components/Input';
import { useUpdateDoctorActive } from 'src/hooks/doctor';
import { toast } from 'react-toastify';

interface DoctorListProps {
	filters: Partial<DoctorListFilter>;
}

const DoctorList: React.FunctionComponent<DoctorListProps> = ({ filters }) => {
	const { setTotalItem } = useTableUtil();

	const query = useQuery(
		['doctors', filters],
		async () => {
			const { data } = await getDoctorList(pagingMapper(filters));

			setTotalItem(data.count);

			return data;
		},
		{ initialData: { data: [], count: 0 } },
	);

	const { mutateUpdateDoctorActive, isSuccess } = useUpdateDoctorActive();

	const handleIsActive = (id: string, status: boolean) => {
		mutateUpdateDoctorActive({ id, isActive: status });
	};

	React.useEffect(() => {
		if (isSuccess) {
			query.refetch();
			toast.success('Update status success');
		}
	}, [isSuccess]);

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
			<Row className="flex justify-end pb-4">
				<FormFilterWrapper<DoctorListFilter> defaultValues={{ name: '', phone: '', username: '' }}>
					<Row className="gap-2">
						<Col>
							<TextField commonField={{ name: 'phone', label: 'Phone' }} />
						</Col>
						<Col>
							<TextField commonField={{ name: 'username', label: 'Username' }} />
						</Col>
						<Col>
							<TextField commonField={{ name: 'name', label: 'Name' }} />
						</Col>
					</Row>
				</FormFilterWrapper>
			</Row>
			<TableBuilder
				data={query.data.data}
				columns={[
					{
						title: () => <TableHeaderCell key="name" sortKey="name" label="Name" />,
						key: 'name',

						render: ({ ...props }) => {
							return <TableBodyCell key={`${props.id}-${props.name}`} label={props.name} />;
						},
					},
					{
						title: () => <TableHeaderCell key="username" sortKey="username" label="Username" />,
						key: 'username',
						render: ({ ...props }) => {
							return <TableBodyCell key={`${props.id}-${props.username}`} label={props.username} />;
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
						title: () => <TableHeaderCell key="active" sortKey="isActive" label="Active" />,
						key: 'status',
						render: ({ ...props }) => {
							return <StatusTag value={props.isActive} key={`${props.id}-${props.status}`} />;
						},
					},
					{
						title: () => <TableHeaderCell key="" sortKey="" label="" />,
						key: 'action',

						render: ({ ...props }) => {
							return (
								<div className="flex justify-end gap-2">
									{props.isActive ? (
										<Button danger onClick={() => handleIsActive(props.id, false)}>
											Deactve
										</Button>
									) : (
										<Button type="primary" onClick={() => handleIsActive(props.id, true)}>
											Active
										</Button>
									)}
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
