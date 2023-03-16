import * as React from 'react';
import { Button, Modal } from 'antd';

import { useModalContext } from 'src/contexts/ModalContext';
import { QuestionPreview } from 'src/models/question';
import { useQuery } from '@tanstack/react-query';
import { SortOrder } from 'src/models/interface';
import { getSymptoms } from 'src/api/symptom';
import { pagingMapper } from 'src/utils/object.helper';
import { TableBodyCell, TableBuilder, TableHeaderCell } from '../Tables';

interface ViewSymptomModalProps {
	categoryId: string;
	nameSympton: string;
}

const ViewSymptomModal: React.FunctionComponent<ViewSymptomModalProps> = ({
	categoryId = '',
	nameSympton = '',
}) => {
	const { handleCloseModal, modal } = useModalContext();
	const { viewSymptom } = modal;
	const [isVisible, setIsVisible] = React.useState(true);
	const handleOk = () => {
		setIsVisible(false);
	};

	const query = useQuery(
		['symptons'],
		async () => {
			const filterProps = {
				orderBy: 'name',
				order: SortOrder.ASC,
				page: 0,
				pageSize: 999,
				categoryId,
			};
			const res = await getSymptoms(pagingMapper(filterProps));
			return res.data;
		},
		{
			initialData: {
				data: [],
				count: 0,
			},
		},
	);
	React.useEffect(() => {
		query.refetch();
	}, [categoryId, query]);

	return (
		// <Modal
		// 	title="Sympton"
		// 	open={isVisible}
		// 	afterClose={() => handleCloseModal('viewSymptom')}
		// 	footer={[
		// 		<Button key="back" type="primary" onClick={handleOk}>
		// 			Cancel
		// 		</Button>,
		// 	]}
		// >
		// 	{query.data?.data.map((symton) => (
		// 		<p key={symton.id} className="text-base">
		// 			<span className="font-bold ">{symton.name}</span>
		// 		</p>
		// 	))}
		// </Modal>
		// <div className="flex flex-col">
		// 	<div className="py-4 md:flex md:items-center md:justify-between">
		// 		<div className="flex-1 min-w-0">
		// 			<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
		// 				Symptom
		// 			</h2>
		// 		</div>
		// 	</div>

		// 	<div className="p-2 bg-white">
		// 		<h1 className="text-xl font-bold uppercase">{nameSympton}</h1>
		// 		{query.data?.data.map((symton) => (
		// 			<p key={symton.id} className="text-base">
		// 				<span className="font-semibold ">{symton.name}</span>
		// 			</p>
		// 		))}
		// 	</div>
		// </div>
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Sympton
					</h2>
				</div>
			</div>
			<TableBuilder<any>
				data={query.data.data}
				columns={[
					{
						title: () => <TableHeaderCell key="name" sortKey="name" label={nameSympton} />,
						width: 500,
						key: 'name',

						render: ({ ...props }) => {
							return <TableBodyCell key={`${props.id}-${props.name}`} label={props.name} />;
						},
					},
					// {
					// 	title: () => <TableHeaderCell key="detail" sortKey="" label="" />,
					// 	key: '',
					// 	render: ({ ...props }) => {
					// 		return (
					// 			<div className="flex items-center justify-start gap-4">
					// 				{props.id ? (
					// 					<Button
					// 						type="link"
					// 						onClick={() => {
					// 							setId(props.id);
					// 							setNameSympton(props.name);
					// 						}}
					// 					>
					// 						View detail
					// 					</Button>
					// 				) : (
					// 					<></>
					// 				)}
					// 			</div>
					// 		);
					// 	},
					// },
				]}
				rowKey="id"
				isLoading={query.isLoading}
			/>
		</>
	);
};

export default ViewSymptomModal;
