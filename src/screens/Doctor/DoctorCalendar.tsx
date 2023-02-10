import * as React from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import { Moment } from 'moment';

import MultiSlotEditModal from 'src/components/Modals/MultiSlotEditModal';
import SlotEditModal from 'src/components/Modals/SlotEditModal';
import { useModalContext } from 'src/contexts/ModalContext';
import { Slot } from 'src/models/slot';

const slots: Slot[] = [
	{
		date: '2023-02-08',
		time: ['Slot 3: 09:00 - 10:00 ', 'Slot 5: 12:00 - 13:00', 'Slot 8: 15:00 - 16:00'],
		id: '1',
		status: 'booked',
	},
	{
		date: '2023-02-09',
		time: ['Slot 3: 09:00 - 10:00 ', 'Slot 5: 12:00 - 13:00', 'Slot 8: 15:00 - 16:00'],
		id: '2',
		status: 'booked',
	},
	{
		date: '2023-02-10',
		time: [
			'Slot 1: 07:00 - 08:00',
			'Slot 3: 09:00 - 10:00 ',
			'Slot 5: 12:00 - 13:00',
			'Slot 8: 15:00 - 16:00',
		],
		id: '3',
		status: 'booked',
	},
	{
		date: '2023-02-12',
		time: ['Slot 3: 09:00 - 10:00 ', 'Slot 5: 12:00 - 13:00', 'Slot 8: 15:00 - 16:00'],
		id: '4',
		status: 'booked',
	},
	{
		date: '2023-03-01',
		time: ['Slot 3: 09:00 - 10:00 ', 'Slot 5: 12:00 - 13:00', 'Slot 8: 15:00 - 16:00'],
		id: '5',
		status: 'booked',
	},
];

const getListData = (value: Moment) => {
	let listData;

	const date = value.format('YYYY-MM-DD');
	const slot = slots.find((mapSlot) => mapSlot.date === date);
	if (slot) {
		listData = slot.time.map((time) => ({
			type: 'success',
			content: time,
		}));
	}

	return listData || [];
};

const getMonthData = (value: Moment) => {
	if (value.month() === 8) {
		return 1394;
	}
};

interface DoctorCalendarProps {}

const DoctorCalendar: React.FunctionComponent<DoctorCalendarProps> = () => {
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

	const dateCellRender = (value: Moment) => {
		const listData = getListData(value);
		return (
			<ul className="events">
				{listData.map((item) => (
					<li key={item.content}>
						<Badge status={item.type as BadgeProps['status']} text={item.content} />
					</li>
				))}
			</ul>
		);
	};

	const openMultiSlotEditModal = () => {
		handleModal('multiSlotEdit', <MultiSlotEditModal />);
		handleOpenModal('multiSlotEdit');
	};

	const openSlotEditModal = (date: Moment) => {
		handleModal(
			'slotEdit',
			<SlotEditModal defaultValues={{ date: date, slots: ['1', '4', '3'] }} />,
		);
		handleOpenModal('slotEdit');
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
				className="px-4"
			/>
		</>
	);
};

export default DoctorCalendar;
