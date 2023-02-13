import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAdminList } from 'src/api/admin/list';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { useTableUtil } from 'src/contexts/TableUtilContext';
import { AdminListFilter } from 'src/interface/admin';
import { pagingMapper } from 'src/utils/object.helper';

import { Col, Row } from 'antd';
import { TextField } from 'src/components/Input';
import FormFilterWrapper from 'src/components/Input/FormFilterWrapper';

interface AdminListProps {
	filters: Partial<AdminListFilter>;
}

const AdminList: React.FunctionComponent<AdminListProps> = ({ filters }) => {
	const { setTotalItem } = useTableUtil();

	const query = useQuery(
		['admins', filters],
		async () => {
			const { data } = await getAdminList(pagingMapper(filters));

			setTotalItem(data.count);

			return data;
		},
		{
			initialData: { data: [], count: 0 },
		},
	);

	return (
		<>
			<div className="items-start justify-between py-4 md:flex">
				<div className="">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Admins
					</h2>
				</div>
				<FormFilterWrapper<AdminListFilter> defaultValues={{ name: '', username: '' }}>
					<Row className="gap-2">
						<Col>
							<TextField commonField={{ name: 'username', label: 'Username' }} />
						</Col>
						<Col>
							<TextField commonField={{ name: 'name', label: 'Name' }} />
						</Col>
					</Row>
				</FormFilterWrapper>
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
