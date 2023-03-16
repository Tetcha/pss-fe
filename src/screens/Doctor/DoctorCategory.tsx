import * as React from 'react';
import StatusTag from 'src/components/Common/StatusTag';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import _get from 'lodash.get';
import { useQuery } from '@tanstack/react-query';
import { useModalContext } from 'src/contexts/ModalContext';
import AddSymptomModal from 'src/components/Modals/AddSymptomModal';
import { Button } from 'antd';
import AddCategoryModal from 'src/components/Modals/AddCategoryModal';
import { SortOrder } from 'src/models/interface';
import { getCategories } from 'src/api/category';
import { pagingMapper } from 'src/utils/object.helper';
import ViewSymptomModal from 'src/components/Modals/ViewSymptomModal';
import { useTableUtil } from 'src/contexts/TableUtilContext';

interface DoctorCategoryProps {}

const DoctorCategory: React.FunctionComponent<DoctorCategoryProps> = () => {
	const { setTotalItem } = useTableUtil();
	const query = useQuery(
		['categories'],
		async () => {
			const filterProps = {
				orderBy: 'name',
				order: SortOrder.ASC,
				page: 0,
				pageSize: 8,
			};
			const { data } = await getCategories(pagingMapper(filterProps));
			setTotalItem(data.count);
			return data;
		},
		{
			initialData: {
				data: [],
				count: 0,
			},
		},
	);

	const { handleOpenModal, handleModal } = useModalContext();

	const openAddSymptomModal = () => {
		handleModal('addSymptomModal', <AddSymptomModal />);
		handleOpenModal('addSymptomModal');
	};

	const openAddCategoryModal = () => {
		handleModal('addCategoryModal', <AddCategoryModal />);
		handleOpenModal('addCategoryModal');
	};

	// const onViewSympTom = (categoryId: string) => {
	// 	handleModal('viewSymptom', <ViewSymptomModal categoryId={categoryId} />);
	// 	handleOpenModal('viewSymptom');
	// };

	const [id, setId] = React.useState('');
	const [nameSympton, setNameSympton] = React.useState('All Sympton');

	// const handleChangeCategoryId = () => {};

	React.useEffect(() => {}, [id]);

	return (
		<div className="flex gap-10">
			<div className="w-1/2">
				<div className="py-4 md:flex md:items-center md:justify-between">
					<div className="flex-1 min-w-0">
						<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
							Category
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
							title: () => <TableHeaderCell key="name" sortKey="name" label="Name Category" />,
							width: 500,
							key: 'name',

							render: ({ ...props }) => {
								return <TableBodyCell key={`${props.id}-${props.name}`} label={props.name} />;
							},
						},
						{
							title: () => <TableHeaderCell key="detail" sortKey="" label="" />,
							key: '',
							render: ({ ...props }) => {
								return (
									<div className="flex items-center justify-start gap-4">
										{props.id ? (
											<Button
												type="link"
												onClick={() => {
													setId(props.id);
													setNameSympton(props.name);
												}}
											>
												View detail
											</Button>
										) : (
											<></>
										)}
									</div>
								);
							},
						},
					]}
					rowKey="id"
					isLoading={query.isLoading}
				/>
			</div>
			<div className="w-1/2">
				<ViewSymptomModal categoryId={id} nameSympton={nameSympton} />
			</div>
		</div>
	);
};

export default DoctorCategory;
