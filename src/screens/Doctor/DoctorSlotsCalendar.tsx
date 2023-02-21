import * as React from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import moment, { Moment } from 'moment';

import MultiSlotEditModal from 'src/components/Modals/MultiSlotEditModal';
import SlotEditModal from 'src/components/Modals/SlotEditModal';
import { useModalContext } from 'src/contexts/ModalContext';
import { AvailableSlot } from 'src/models/slot';
import { useQuery } from '@tanstack/react-query';
import { useStoreDoctor } from 'src/store';
import { getDoctorSlots } from 'src/api/slot';

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
	const monthCellRender = (value: Moment) => {
		const num = getMonthData(value);
		return num ? (
			<div className="notes-month">
				<section>{num}</section>
				<span>Backlog number</span>
			</div>
		) : null;
	};

	const openMultiSlotEditModal = () => {
		handleModal('multiSlotEdit', <MultiSlotEditModal />);
		handleOpenModal('multiSlotEdit');
	};

	const openSlotEditModal = (dates: Moment) => {
		handleModal('slotEdit', <SlotEditModal defaultValues={{ dates: dates, slots: [1, 4, 3] }} />);
		handleOpenModal('slotEdit');
	};
	const [currentMonth, setCurrentMonth] = React.useState<Moment>(moment());

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
							status={'processing'}
							text={`${item.startTime.toUpperCase()}: ${item.status ? 'Booked' : 'Ready'}`}
						/>
					</li>
				))}
			</ul>
		);
	};

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
				dateCellRender={dateCellRender}
				monthCellRender={monthCellRender}
				onSelect={(date) => openSlotEditModal(date)}
				onChange={(date) => setCurrentMonth(date)}
				className="px-4"
			/>
		</>
	);
};

export default DoctorSlotCalendar;
