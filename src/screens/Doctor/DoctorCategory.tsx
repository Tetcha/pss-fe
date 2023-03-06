import * as React from 'react';
import StatusTag from 'src/components/Common/StatusTag';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import _get from 'lodash.get';
import { useQuery } from '@tanstack/react-query';
import { useModalContext } from 'src/contexts/ModalContext';
import AddSymptomModal from 'src/components/Modals/AddSymptomModal';
import { Button } from 'antd';
import AddCategoryModal from 'src/components/Modals/AddCategoryModal';

interface DoctorCategoryProps {}

const DoctorCategory: React.FunctionComponent<DoctorCategoryProps> = () => {
	const query = useQuery(
		['doctors'],
		async () => {
			const res = {
				data: [
					{
						id: '1',
						name: 'John Doe',
						action: 'Withdraw',
						status: 'Success',
						balance: 100000,
					},
					{
						id: '2',
						name: 'John Doe',
						action: 'Add Balance',
						status: 'Pending',
						balance: 20000,
					},
					{
						id: '3',
						name: 'John Doe',
						action: 'Withdraw',
						status: 'Failed',
						balance: 200000,
					},
				],
				count: 3,
			};
			return res;
		},
		{ initialData: { data: [], count: 0 } },
	);

	const renderCurrency = (value: number) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(value);
	};

	const { handleOpenModal, handleModal } = useModalContext();

	const openAddSymptomModal = () => {
		handleModal('addSymptomModal', <AddSymptomModal />);
		handleOpenModal('addSymptomModal');
	};

	const openAddCategoryModal = () => {
		handleModal('addCategoryModal', <AddCategoryModal />);
		handleOpenModal('addCategoryModal');
	};

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Transaction
					</h2>
				</div>
				<div className="flex gap-2">
					<Button type="primary" onClick={() => openAddSymptomModal()}>
						Add Symptom
					</Button>
					<Button type="primary" onClick={() => openAddCategoryModal()}>
						Add Category
					</Button>
				</div>
			</div>
			<TableBuilder<any>
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
						title: () => (
							<TableHeaderCell key="action" sortKey="action" label="Transaction Action" />
						),
						key: 'action',
						render: ({ ...props }) => {
							const index: number = _get(props, 'row.index', 0);
							const data = _get(props, `data[${index}].action`, 'unknown');

							return <TableBodyCell key={`${props.id}-${props.action}`} label={props.action} />;
						},
					},
					{
						title: () => <TableHeaderCell key="action" sortKey="action" label="Amount" />,
						key: 'action',
						render: ({ ...props }) => {
							const index: number = _get(props, 'row.index', 0);
							const data = _get(props, `data[${index}].action`, 'unknown');

							return (
								<TableBodyCell
									key={`${props.id}-${props.balance}`}
									label={renderCurrency(props.balance)}
								/>
							);
						},
					},

					{
						title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
						key: 'status',
						render: ({ ...props }) => {
							return <StatusTag value={props.status} key={`${props.id}-${props.status}`} />;
						},
					},
				]}
				rowKey="id"
				isLoading={query.isLoading}
			/>
		</>
	);
};

export default DoctorCategory;
