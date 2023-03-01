import * as React from 'react';
import { BadgeProps, Col, Radio, Row, Select, Typography } from 'antd';
import { Badge, Calendar } from 'antd';
import moment, { Moment } from 'moment';

import MultiSlotEditModal from 'src/components/Modals/MultiSlotEditModal';
import SlotEditModal from 'src/components/Modals/SlotEditModal';
import { useModalContext } from 'src/contexts/ModalContext';
import { AvailableSlot } from 'src/models/slot';
import { useQuery } from '@tanstack/react-query';
import { useStoreDoctor } from 'src/store';
import { getDoctorSlots } from 'src/api/slot';
import { useDebounce } from 'usehooks-ts';

const getMonthData = (value: Moment) => {
	if (value.month() === 8) {
		return 1394;
	}
};

const getSlotsOfDay = (slots: AvailableSlot[], date: Moment) => {
	return slots.filter((slot) => moment(slot.date).isSame(date, 'day'));
};

interface DoctorSlotCalendarProps {}

const DoctorSlotCalendar: React.FunctionComponent<DoctorSlotCalendarProps> = () => {
	const { handleModal, handleOpenModal } = useModalContext();

	const [currentMonth, setCurrentMonth] = React.useState<Moment>(moment());

	const openMultiSlotEditModal = () => {
		handleModal('multiSlotEdit', <MultiSlotEditModal />);
		handleOpenModal('multiSlotEdit');
	};

	const openSlotEditModal = (dates: Moment) => {
		if (!dates.isSame(currentMonth, 'month')) {
			setCurrentMonth(dates);
			return;
		}

		const slots = getSlotsOfDay(queryAvailableSlots.data, dates).map((slot) => slot.slotEnumId);

		handleModal('slotEdit', <SlotEditModal defaultValues={{ dates: dates, slots }} />);
		handleOpenModal('slotEdit');
	};

	const { id } = useStoreDoctor();

	const queryAvailableSlots = useQuery<AvailableSlot[]>(
		['availableSlots', id, currentMonth],
		async () => {
			const firstDayOfMonth = currentMonth.startOf('month').format('YYYY-MM-DD');
			const lastDayOfMonth = currentMonth.endOf('month').format('YYYY-MM-DD');

			const { data } = await getDoctorSlots({
				id,
				from: firstDayOfMonth,
				to: lastDayOfMonth,
			});

			return data;
		},
		{
			initialData: [],
		},
	);

	const dateCellRender = (value: Moment) => {
		const listData = getSlotsOfDay(queryAvailableSlots.data, value);
		return (
			<ul className="events">
				{listData.map((item) => (
					<li key={item.id}>
						<Badge
							status={`${item?.booking[0]?.status === 'ACCEPTED' ? 'processing' : 'success'}`}
							text={`${item.startTime.toUpperCase()}: ${item.status ? 'Booked' : 'Ready'}`}
						/>
					</li>
				))}
			</ul>
		);
	};

	React.useEffect(() => {}, [queryAvailableSlots]);

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Booking Calendar
					</h2>
				</div>
				<div className="flex mt-4 md:mt-0 md:ml-4">
					<button
						type="button"
						onClick={() => openMultiSlotEditModal()}
						className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Slot Booking
					</button>
				</div>
			</div>
			<Calendar
				headerRender={({ value, type, onChange, onTypeChange }) => {
					const start = 0;
					const end = 12;
					const monthOptions = [];

					const current = value.clone();
					const localeData = value.localeData();
					const months = [];
					for (let i = 0; i < 12; i++) {
						current.month(i);
						months.push(localeData.monthsShort(current));
					}

					for (let i = start; i < end; i++) {
						monthOptions.push(
							<Select.Option key={i} value={i} className="month-item">
								{months[i]}
							</Select.Option>,
						);
					}

					const year = value.year();
					const month = value.month();
					const options = [];
					for (let i = year - 10; i < year + 10; i += 1) {
						options.push(
							<Select.Option key={i} value={i} className="year-item">
								{i}
							</Select.Option>,
						);
					}
					return (
						<div style={{ padding: 8 }}>
							<Typography.Title level={4}>Custom header</Typography.Title>
							<Row gutter={8}>
								<Col>
									<Select
										size="small"
										dropdownMatchSelectWidth={false}
										className="my-year-select"
										value={year}
										onChange={(newYear) => {
											const now = value.clone().year(newYear);
											onChange(now);
										}}
									>
										{options}
									</Select>
								</Col>
								<Col>
									<Select
										size="small"
										dropdownMatchSelectWidth={false}
										value={month}
										onChange={(newMonth) => {
											const now = value.clone().month(newMonth);
											onChange(now);
										}}
									>
										{monthOptions}
									</Select>
								</Col>
							</Row>
						</div>
					);
				}}
				dateCellRender={dateCellRender}
				onSelect={(date) => openSlotEditModal(date)}
				// onChange={dateCellRender}
				className="px-4"
			/>
		</>
	);
};

export default DoctorSlotCalendar;
