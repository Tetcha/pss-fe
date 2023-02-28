import * as React from 'react';
import { Modal } from 'antd';
import { Badge, Calendar } from 'antd';
import moment, { Moment } from 'moment';

import { useModalContext } from 'src/contexts/ModalContext';
import { AvailableSlot } from 'src/models/slot';
import { useQuery } from '@tanstack/react-query';
import { getDoctorSlots } from 'src/api/slot';
import BookingDoctor from './BookingDoctor';
import { Doctor } from 'src/models/doctor';
import { useStudentBooking } from 'src/hooks/booking';

interface BookingCalendarProps {
	doctor: Doctor;
}

const getMonthData = (value: Moment) => {
	if (value.month() === 8) {
		return 1394;
	}
};

const getSlotsOfDay = (slots: AvailableSlot[], date: Moment) => {
	return slots.filter((slot) => moment(slot.date).isSame(date, 'day'));
};

const BookingCalendar: React.FunctionComponent<BookingCalendarProps> = ({ doctor }) => {
	const { handleModal, handleOpenModal, handleCloseModal, modal } = useModalContext();
	const { BookingCalendar } = modal;
	const [isVisible, setIsVisible] = React.useState(BookingCalendar.isOpen);

	const monthCellRender = (value: Moment) => {
		const num = getMonthData(value);
		return num ? (
			<div className="notes-month">
				<section>{num}</section>
				<span>Backlog number</span>
			</div>
		) : null;
	};

	const [currentDate, setCurrentDate] = React.useState<Moment>(moment());

	const id = doctor.id;
	const queryAvailableSlots = useQuery<AvailableSlot[]>(
		['availableSlots', id, currentDate],
		async () => {
			const firstDayOfMonth = currentDate.startOf('month').format('YYYY-MM-DD');
			const lastDayOfMonth = currentDate.endOf('month').format('YYYY-MM-DD');

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
		const currentDay = moment();

		if (value.format('YYYY-MM-DD') >= currentDay.format('YYYY-MM-DD')) {
			const listData = getSlotsOfDay(queryAvailableSlots.data, value);

			return (
				<ul className="events">
					{listData.map((item) => (
						<li key={item.id}>
							<Badge
								status={`${item.status ? 'processing' : 'success'}`}
								text={`${item.startTime.toUpperCase()}: ${item.status ? 'Booked' : 'Ready'}`}
							/>
						</li>
					))}
				</ul>
			);
		}
	};
	const openBookingDoctorModal = (doctor: Doctor, date: Moment) => {
		const currentDay = moment();
		if (date.format('YYYY-MM-DD') >= currentDay.format('YYYY-MM-DD')) {
			const listData = getSlotsOfDay(queryAvailableSlots.data, date);
			handleModal(
				'BookingDoctor',
				<BookingDoctor doctor={doctor} slot={{ date: date, slots: listData }} />,
			);
			listData[0] && handleOpenModal('BookingDoctor');
		}
	};
	const { isSuccess } = useStudentBooking();

	React.useEffect(() => {
		if (isSuccess) {
			setIsVisible(false);
		}
	}, [isSuccess]);

	return (
		<>
			<Modal
				open={isVisible}
				onCancel={() => setIsVisible(false)}
				width={1280}
				afterClose={() => handleCloseModal('BookingCalendar')}
				destroyOnClose
			>
				<div className="py-4 md:flex md:items-center md:justify-between">
					<div className="flex-1 min-w-0">
						<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
							Booking Calendar - Doctor: {doctor.name}
						</h2>
					</div>
				</div>
				<Calendar
					dateCellRender={dateCellRender}
					monthCellRender={monthCellRender}
					onSelect={(date) => {
						openBookingDoctorModal(doctor, date);
					}}
					// onChange={(date) => setCurrentDate(date)}
					className="px-4"
				/>
			</Modal>
		</>
	);
};

export default BookingCalendar;
