import * as React from 'react';
import Link from 'next/link';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Modal } from 'antd';

import StatusTag from 'src/components/Common/StatusTag';
import ViewQuestionModal from 'src/components/Modals/ViewQuestionModal';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { ROUTES_URL } from 'src/constants/routes';
import { useModalContext } from 'src/contexts/ModalContext';
import { Gender } from 'src/interface/common';
import { QuestionPreview } from 'src/models/question';
const { confirm } = Modal;

interface BookingListProps {}

const BookingList: React.FunctionComponent<BookingListProps> = () => {
	const query = useQuery(
		['admins'],
		async () => {
			const res = {
				data: [
					{
						id: '1',
						date: '19-09-2023',
						slot: 'Slot 4: 10:00 - 11:00',
						name: 'John Doe',
						gender: Gender.MALE,
						birthday: '19-09-2000',
						status: 'Pending',
						email: 'example@gmail.com',
						questions: [
							{
								id: 'q-1',
								content: 'Question 1',
							},
							{
								id: 'q-2',
								content: 'Question 2',
							},
							{
								id: 'q-3',
								content: 'Question 3',
							},
						],
					},
					{
						id: '2',
						date: '19-09-2023',
						slot: 'Slot 4: 10:00 - 11:00',
						name: 'John Doe',
						birthday: '19-09-2000',
						gender: Gender.MALE,
						status: 'Pending',
						email: 'example@gmail.com',
					},
					{
						id: '3',
						date: '19-09-2023',
						slot: 'Slot 4: 10:00 - 11:00',
						name: 'John Doe',
						birthday: '19-09-2000',
						gender: Gender.MALE,
						status: 'Pending',
						email: 'example@gmail.com',
					},
				],
				count: 3,
			};
			return res;
		},
		{ initialData: { data: [], count: 0 } },
	);

	const { handleOpenModal, handleModal } = useModalContext();

	const onAccept = (id: string) => {
		confirm({
			title: 'Do you want to accept this booking?',
			icon: <ExclamationCircleOutlined />,
			content:
				'When clicked the OK button, this booking will be accepted but those slots same as this booking will be deny',
		});
	};

	const onDeny = (id: string) => {
		confirm({
			title: 'Do you want to deny this booking?',
			icon: <ExclamationCircleOutlined />,
			content: 'When clicked the OK button, this booking will be denied',
		});
	};

	const onViewQuestions = (questions: QuestionPreview[]) => {
		handleModal('viewQuestions', <ViewQuestionModal questions={questions} />);
		handleOpenModal('viewQuestions');
	};

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Booking
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
						title: () => <TableHeaderCell key="slot" sortKey="slot" label="Date - Slot" />,
						width: 300,
						key: 'slot',

						render: ({ ...props }) => {
							return (
								<TableBodyCell
									key={`${props.id}-${props.slot}-${props.date}`}
									label={
										<div className="flex flex-col">
											<div className="text-sm font-medium text-gray-900">{props.date}</div>
											<div className="text-sm font-medium text-gray-900">{props.slot}</div>
										</div>
									}
								/>
							);
						},
					},

					{
						title: () => <TableHeaderCell key="gender" sortKey="gender" label="Student Info" />,
						width: 300,
						key: 'gender',

						render: ({ ...props }) => {
							return (
								<TableBodyCell
									key={`${props.id}-${props.name}-${props.gender}-${props.birthday}`}
									label={
										<div className="flex flex-col">
											<div className="text-sm font-medium text-gray-900">{props.gender}</div>
											<div className="text-sm font-medium text-gray-900">{props.birthday}</div>
										</div>
									}
								/>
							);
						},
					},
					{
						title: () => <TableHeaderCell key="email" sortKey="email" label="Email" />,
						key: '',
						render: ({ ...props }) => {
							return <TableBodyCell key={`${props.id}-${props.email}`} label={props.email} />;
						},
					},
					{
						title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
						key: '',
						render: ({ ...props }) => {
							return <StatusTag value={props.status} key={`${props.id}-${props.status}`} />;
						},
					},

					{
						title: () => <TableHeaderCell key="email" sortKey="email" label="" />,
						key: 'action',

						render: ({ ...props }) => {
							return (
								<div className="flex items-center justify-end gap-4">
									{props.questions ? (
										<Button type="link" onClick={() => onViewQuestions(props.questions)}>
											View questions
										</Button>
									) : (
										<></>
									)}
									<Button type="primary" onClick={() => onAccept(props.id)}>
										Accept
									</Button>
									<Button danger onClick={() => onDeny(props.id)}>
										Deny
									</Button>
								</div>
							);
						},
					},
				]}
				rowKey="id"
				isLoading={query.isLoading}
			/>
		</>
	);
};

export default BookingList;
