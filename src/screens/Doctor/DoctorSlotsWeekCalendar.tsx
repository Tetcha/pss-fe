import * as React from 'react';
import { Button, DatePicker, Row } from 'antd';
import { AvailableSlot, Slot } from 'src/models/slot';
import { useQuery } from '@tanstack/react-query';
import { getDoctorSlots, getSlots } from 'src/api/slot';
import moment, { Moment } from 'moment';
import WeeklyCalendar, { DataType, SlotType } from 'src/components/Calendar/WeeklyCalendar';
import { useStoreDoctor } from 'src/store';

interface DoctorWeekCalendarProps {}

const DoctorWeekCalendar: React.FunctionComponent<DoctorWeekCalendarProps> = () => {
	const [currentWeek, setCurrentWeek] = React.useState<Moment>(moment());

	const { id } = useStoreDoctor();

	const queryAvailableSlots = useQuery<AvailableSlot[]>(
		['availableSlots', id, currentWeek],
		async () => {
			const firstDayOfWeek = currentWeek.clone().startOf('week').add(1, 'day').format('YYYY-MM-DD');
			const lastDayOfWeek = currentWeek.clone().endOf('week').add(1, 'day').format('YYYY-MM-DD');

			const { data } = await getDoctorSlots({
				id,
				from: firstDayOfWeek,
				to: lastDayOfWeek,
			});

			return data;
		},
		{
			initialData: [],
		},
	);

	const querySlots = useQuery<Slot[]>(
		['slots'],
		async () => {
			const { data } = await getSlots();

			return data;
		},
		{
			initialData: [],
		},
	);

	const slots: SlotType[] = querySlots.data.map((slot) => ({
		id: slot.id,
		name: slot.name,
		hour: slot.startTime,
	}));

	const events: DataType<AvailableSlot>[] = queryAvailableSlots.data.map((item) => ({
		date: moment(item.date),
		slotId: item.slotEnumId,
		event: item,
		data: item,
		booking: item.booking,
	}));

	console.log('events', events);

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Week Calendar
					</h2>
					<Row justify="end">
						<DatePicker onChange={(value) => setCurrentWeek(value || moment())} picker="week" />
					</Row>
					<Row>
						<WeeklyCalendar<AvailableSlot>
							events={events}
							slots={slots}
							onCompare={(event, slot) => event.slotId === slot.id}
							currentWeek={currentWeek.week()}
							onDisplayEvent={(event) => (
								<>
									{event?.booking[0]?.status === 'ACCEPTED' ? (
										<Button className="w-full h-auto font-medium text-gray-700 whitespace-normal bg-green-300 border-none rounded-md hover:bg-green-500 hover:text-white">
											Booked
										</Button>
									) : (
										<Button className="w-full h-auto font-medium text-gray-700 whitespace-normal bg-blue-300 border-none rounded-md hover:bg-blue-500 hover:text-white">
											Available slot
										</Button>
									)}
								</>
							)}
						/>
					</Row>
				</div>
			</div>
		</>
	);
};

export default DoctorWeekCalendar;
