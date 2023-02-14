import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import _get from 'lodash.get';

import StatusTag from 'src/components/Common/StatusTag';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { StudentListFilter } from 'src/interface/student';
import { getStudentList } from 'src/api/admin/list';
import { pagingMapper } from 'src/utils/object.helper';
import { useTableUtil } from 'src/contexts/TableUtilContext';
import FormFilterWrapper from 'src/components/Input/FormFilterWrapper';
import { Button, Col, Row } from 'antd';
import { TextField } from 'src/components/Input';

interface StudentListProps {
	filters: Partial<StudentListFilter>;
}

const StudentList: React.FunctionComponent<StudentListProps> = ({ filters }) => {
	const { setTotalItem } = useTableUtil();

	const query = useQuery(
		['students', filters],
		async () => {
			const { data } = await getStudentList(pagingMapper(filters));

			setTotalItem(data.count);

			return data;
		},
		{ initialData: { data: [], count: 0 } },
	);

	const handleIsActive = (id: string) => {
		console.log('handleIsActive', id);
	};

	return (
		<>
			<div className="py-4 ">
				<Row>
					<div className="flex-1 min-w-0">
						<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
							Students
						</h2>
					</div>
				</Row>
				<Row className="flex justify-end">
					<FormFilterWrapper<StudentListFilter>
						defaultValues={{ name: '', phone: '', email: '', studentCode: '' }}
					>
						<Row className="gap-2">
							<Col>
								<TextField commonField={{ name: 'phone', label: 'Phone' }} />
							</Col>
							<Col>
								<TextField commonField={{ name: 'email', label: 'Email' }} />
							</Col>
							<Col>
								<TextField commonField={{ name: 'name', label: 'Name' }} />
							</Col>
							<Col>
								<TextField commonField={{ name: 'studentCode', label: 'Student Code' }} />
							</Col>
						</Row>
					</FormFilterWrapper>
				</Row>
			</div>
			<TableBuilder
				data={query.data.data}
				columns={[
					{
						title: () => (
							<TableHeaderCell key="studentCode" sortKey="studentCode" label="Student Code" />
						),
						width: 200,
						key: 'studentCode',

						render: ({ ...props }) => {
							return (
								<TableBodyCell key={`${props.id}-${props.studentCode}`} label={props.studentCode} />
							);
						},
					},
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
						title: () => <TableHeaderCell key="balance" sortKey="balance" label="Balance" />,
						key: 'phone',
						render: ({ ...props }) => {
							return <TableBodyCell key={`${props.id}-${props.balance}`} label={props.balance} />;
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
						title: () => <TableHeaderCell key="isActive" sortKey="isActive" label="Active" />,
						key: 'status',
						render: ({ ...props }) => {
							return <StatusTag value={props.isActive} key={`${props.id}-${props.isActive}`} />;
						},
					},
					{
						title: () => <TableHeaderCell key="email" sortKey="email" label="" />,
						key: 'action',

						render: ({ ...props }) => {
							return (
								<div className="flex justify-end gap-2">
									{props.isActive ? (
										<Button danger onClick={() => handleIsActive(props.id)}>
											Deactve
										</Button>
									) : (
										<Button type="primary" onClick={() => handleIsActive(props.id)}>
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

export default StudentList;
