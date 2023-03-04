import * as React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Col, Modal, Row } from 'antd';

import StatusTag from 'src/components/Common/StatusTag';
import ViewQuestionModal from 'src/components/Modals/ViewQuestionModal';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { useModalContext } from 'src/contexts/ModalContext';
import { QuestionPreview } from 'src/models/question';
import { getBooking } from 'src/api/booking';
import { BookingListFilter } from 'src/interface/booking';
import { pagingMapper } from 'src/utils/object.helper';
import { useStoreDoctor } from 'src/store';
import { capitalizeFirstLetter, currencyFormat } from 'src/utils/string.helper';
import FormFilterWrapper from 'src/components/Input/FormFilterWrapper';
import { InputSelect } from 'src/components/Input';
import moment from 'moment';
import { BookingSlotStatus } from 'src/models/booking';
import { useUpdateBookingStatus } from 'src/hooks/booking';
const { confirm } = Modal;

interface BookingListProps {
	filters: BookingListFilter;
}

const BookingList: React.FunctionComponent<BookingListProps> = ({ filters }) => {
	const { id } = useStoreDoctor();

	const query = useQuery(
		['booking-slots', filters, id],
		async () => {
			const newFilters = { ...filters, id };
			const res = await getBooking(pagingMapper(newFilters));
			return res.data;
		},
		{ initialData: { data: [], count: 0 } },
	);

	const { mutateUpdateBookingStatus } = useUpdateBookingStatus();

	const onAccept = (id: string) => {
		confirm({
			title: 'Do you want to accept this booking?',
			icon: <ExclamationCircleOutlined />,
			content:
				'When clicked the OK button, this booking will be accepted but those slots same as this booking will be deny',
			onOk() {
				mutateUpdateBookingStatus(
					{ id, status: BookingSlotStatus.ACCEPTED },
					{
						onSuccess: () => {
							query.refetch();
						},
					},
				);
			},
		});
	};

	const onDeny = (id: string) => {
		confirm({
			title: 'Do you want to deny this booking?',
			icon: <ExclamationCircleOutlined />,
			content: 'When clicked the OK button, this booking will be denied',
			onOk() {
				mutateUpdateBookingStatus(
					{ id, status: BookingSlotStatus.REJECTED },
					{
						onSuccess: () => {
							query.refetch();
						},
					},
				);
			},
		});
	};

	const { handleOpenModal, handleModal } = useModalContext();
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
				<FormFilterWrapper<BookingListFilter> defaultValues={{ name: '', username: '' }}>
					<Row className="gap-2">
						<Col>
							<InputSelect
								commonField={{
									name: 'status',
									label: 'Status',
								}}
								options={[
									{
										label: 'All',
										value: '',
									},
									...Object.keys(BookingSlotStatus).map((key) => ({
										label: capitalizeFirstLetter(key),
										value: key,
									})),
								]}
								className="w-64"
							/>
						</Col>
					</Row>
				</FormFilterWrapper>
			</div>
			<TableBuilder
				data={query.data.data.filter((item) => moment(item.slot.date).isSameOrAfter(moment()))}
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
											<div className="text-sm font-medium text-gray-900">
												{moment(props.slot.date).format('YYYY-MM-DD')}
											</div>
											<div className="text-sm font-medium text-gray-900">
												{`${props.slot.endTime} - ${props.slot.startTime}`.toUpperCase()}
											</div>
										</div>
									}
								/>
							);
						},
					},
					{
						title: () => <TableHeaderCell key="cost" sortKey="cost" label="Cost" />,
						key: '',
						render: ({ ...props }) => {
							return (
								<TableBodyCell
									key={`${props.id}-${props.cost}`}
									label={
										<div className="flex flex-col">
											<div className="text-sm font-medium text-gray-900">
												{currencyFormat(props.cost)}
											</div>
										</div>
									}
								/>
							);
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
						title: () => <TableHeaderCell key="questions" sortKey="questions" label="Questions" />,
						key: '',
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
								</div>
							);
						},
					},
					{
						title: () => <TableHeaderCell key="email" sortKey="email" label="" />,
						key: 'action',

						render: ({ ...props }) => {
							return (
								<div className="flex items-center justify-end gap-4">
									{props.status === BookingSlotStatus.PENDING ? (
										<>
											<Button type="primary" onClick={() => onAccept(props.id)}>
												Accept
											</Button>
											<Button danger onClick={() => onDeny(props.id)}>
												Deny
											</Button>
										</>
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
		</>
	);
};

export default BookingList;
