import * as React from 'react';
import { Button, DatePicker, Row } from 'antd';
import { Slot } from 'src/models/slot';
import { useQuery } from '@tanstack/react-query';
import { getSlots } from 'src/api/slot';
import moment, { Moment } from 'moment';
import WeeklyCalendar, { DataType, SlotType } from 'src/components/Calendar/WeeklyCalendar';
import { useStoreDoctor } from 'src/store';
import { getBooking } from 'src/api/booking';
import { pagingMapper } from 'src/utils/object.helper';
import { BookingListFilter } from 'src/interface/booking';
import { SortOrder } from 'src/contexts/TableUtilContext';
import { Booking, BookingSlotStatus } from 'src/models/booking';
import { ENV_VARIABLES } from 'src/constants/env';
import clsx from 'clsx';

interface DoctorAppointmentWeekCalendarProps {}

const DoctorAppointmentWeekCalendar: React.FunctionComponent<
	DoctorAppointmentWeekCalendarProps
> = () => {
	const [currentWeek, setCurrentWeek] = React.useState<Moment>(moment());

	const [token, setToken] = React.useState<string>('');

	React.useEffect(() => {
		const token = localStorage.getItem('access-token') || '';
		setToken(token);
	}, []);

	const { id } = useStoreDoctor();

	const query = useQuery(
		['appointment-list', id],
		async () => {
			const filterProps: BookingListFilter = {
				orderBy: 'date',
				order: SortOrder.DESC,
				status: BookingSlotStatus.ACCEPTED,
				page: 0,
				pageSize: 100,
				id,
			};
			const res = await getBooking(pagingMapper(filterProps));

			const firstDayOfWeek = currentWeek.clone().startOf('isoWeek').format('YYYY-MM-DD');
			const lastDayOfWeek = currentWeek
				.clone()
				.endOf('isoWeek')
				.add(1, 'days')
				.format('YYYY-MM-DD');

			const filterCurrentWeek = res.data.data.filter((item) => {
				const isInRange = moment(item.slot.date).isBetween(firstDayOfWeek, lastDayOfWeek);
				return isInRange;
			});

			return {
				data: filterCurrentWeek,
				count: res.data.count,
			};
		},
		{ initialData: { data: [], count: 0 }, enabled: Boolean(id) },
	);

	const querySlots = useQuery<Slot[]>(
		['slots-list'],
		async () => {
			const { data } = await getSlots();

			return data;
		},
		{
			initialData: [],
		},
	);

	const slots: SlotType[] = querySlots.data.map((slot) => ({
		id: slot.startTime,
		name: slot.name,
		hour: slot.startTime,
	}));

	const events: DataType<Booking>[] = query.data.data.map((item) => ({
		date: moment(item.slot.date),
		slotId: item.slot.startTime,
		event: item,
		data: item,
	}));

	const compareTime = (hour: string, date: string) => {
		const current = moment().format('YYYY-MM-DD hh:mm:ss A');
		const slot = moment(`${date} ${hour}`, 'YYYY-MM-DD hh:mm:ss A').format('YYYY-MM-DD hh:mm:ss A');

		if (moment(slot).isBefore(current)) {
			return 'Completed';
		}

		if (moment(slot).isSame(current, 'hour')) {
			return 'Join room';
		}

		return 'Not in time';
	};

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Appointment Week Calendar
					</h2>
					<Row justify="end">
						<DatePicker onChange={(value) => setCurrentWeek(value || moment())} picker="week" />
					</Row>
					<Row>
						<WeeklyCalendar<Booking>
							events={events}
							slots={slots}
							onCompare={(event, slot) => event.slotId === slot.id}
							currentWeek={currentWeek.week()}
							onDisplayEvent={(event) => (
								<>
									{event.slot.date && (
										<Button
											disabled={!(compareTime(event.slot.endTime, event.slot.date) === 'Join room')}
											className={clsx(
												'w-full h-auto font-medium text-gray-700 whitespace-normal border-none rounded-md hover:text-white',
												{
													'bg-blue-300':
														compareTime(event.slot.endTime, event.slot.date) === 'Completed',
													'bg-green-300':
														compareTime(event.slot.endTime, event.slot.date) === 'Join room',
													'bg-red-300':
														compareTime(event.slot.endTime, event.slot.date) === 'Not in time',
												},
											)}
											href={`${ENV_VARIABLES.CALL_URL}/room/${event.id}/doctor?token=${token}`}
										>
											{compareTime(event.slot.endTime, event.slot.date)}
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

export default DoctorAppointmentWeekCalendar;
