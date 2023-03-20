import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { getDoctorSlots } from 'src/api/slot';
import StatusTag from 'src/components/Common/StatusTag';
import ViewQuestionModal from 'src/components/Modals/ViewQuestionModal';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { useModalContext } from 'src/contexts/ModalContext';
import { useTableUtil } from 'src/contexts/TableUtilContext';
import { QuestionPreview } from 'src/models/question';
import { AvailableSlot } from 'src/models/slot';
import { useStoreDoctor } from 'src/store';

interface DoctorAppointmentListProps {}

const DoctorAppointmentList: React.FunctionComponent<DoctorAppointmentListProps> = () => {
	const [currentWeek, setCurrentWeek] = React.useState<Moment>(moment());
	const { id } = useStoreDoctor();

	const { setPageSize } = useTableUtil();

	React.useEffect(() => {
		setPageSize(100);
	}, []);

	const queryAvailableSlots = useQuery<AvailableSlot[]>(
		['availableSlots', id, currentWeek],
		async () => {
			const firstDayOfWeek = currentWeek.clone().startOf('week').format('YYYY-MM-DD');
			const lastDayOfWeek = currentWeek.clone().endOf('week').format('YYYY-MM-DD');

			const { data } = await getDoctorSlots({
				id,
				from: firstDayOfWeek,
				to: lastDayOfWeek,
			});

			return data;
		},
		{
			initialData: [],
			enabled: Boolean(id),
		},
	);

	const { handleOpenModal, handleModal } = useModalContext();
	const onViewQuestions = (questions: QuestionPreview[]) => {
		handleModal('viewQuestions', <ViewQuestionModal questions={questions} />);
		handleOpenModal('viewQuestions');
	};

	const formatStatus = (hour: string, date: string) => {
		const current = moment().format('YYYY-MM-DD hh:mm:ss A');
		const slot = moment(`${date} ${hour}`, 'YYYY-MM-DD hh:mm:ss A').format('YYYY-MM-DD hh:mm:ss A');

		if (moment(slot).isBefore(current)) {
			return 'EXPIRED';
		}

		if (moment(slot).isSame(current, 'hour')) {
			return 'CURRENT';
		}

		return 'AVAILABLE';
	};

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Booking
					</h2>
				</div>
			</div>
			<TableBuilder
				data={queryAvailableSlots.data}
				columns={[
					{
						title: () => <TableHeaderCell key="slot" sortKey="createAt" label="Date - Slot" />,
						width: 300,
						key: 'slot',

						render: ({ ...props }) => {
							return (
								<TableBodyCell
									key={`${props.id}-${props.slot}-${props.date}`}
									label={
										<div className="flex flex-col">
											<div className="text-sm font-medium text-gray-900">
												{moment(props.date).format('YYYY-MM-DD')}
											</div>
											<div className="text-sm font-medium text-gray-900">
												{`${props.startTime} - ${props.endTime}`.toUpperCase()}
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
							return (
								<TableBodyCell
									key={`${props.id}-${props.status}`}
									label={
										<StatusTag
											value={formatStatus(props.endTime, props.date)}
											key={`${props.id}-${props.status}`}
										/>
									}
								/>
							);
						},
					},
					{
						title: () => <TableHeaderCell key="questions" sortKey="questions" label="Questions" />,
						key: '',
						render: ({ ...props }) => {
							return (
								<div className="flex items-center justify-start gap-4">
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
				]}
				rowKey="id"
				isLoading={queryAvailableSlots.isLoading}
			/>
		</>
	);
};

export default DoctorAppointmentList;
