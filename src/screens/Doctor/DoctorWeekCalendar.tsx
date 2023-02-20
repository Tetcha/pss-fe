import * as React from 'react';
import { Button, DatePicker, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Slot } from 'src/models/slot';
import { useQuery } from '@tanstack/react-query';
import { getSlots } from 'src/api/slot';
import moment, { Moment } from 'moment';
import WeeklyCalendar, { DataType, SlotType } from 'src/components/Calendar/WeeklyCalendar';
import StatusTag from 'src/components/Common/StatusTag';

// interface WeekDays {
// 	Mon: React.ReactNode;
// 	Tue: React.ReactNode;
// 	Wed: React.ReactNode;
// 	Thu: React.ReactNode;
// 	Fri: React.ReactNode;
// 	Sat: React.ReactNode;
// 	Sun: React.ReactNode;
// }

// interface DataType {
// 	key: React.Key;
// 	id: string;
// 	name: string;
// 	hours: string;
// 	date: string;
// 	slot: number;
// 	weekdays: WeekDays;
// }

// const columns: ColumnsType<DataType> = [
// 	{
// 		title: 'Hours',
// 		dataIndex: 'hours',
// 		key: 'hours',
// 		width: 120,
// 		className: 'bg-gray-50',
// 		render: (_, record) => <Space size="middle">{record.hours.toUpperCase()}</Space>,
// 	},
// 	{
// 		title: 'Mon',
// 		dataIndex: 'Mon',
// 		key: 'Mon',
// 		render: (index, record) => {
// 			return record.weekdays.Mon;
// 		},
// 	},
// 	{
// 		title: 'Tue',
// 		dataIndex: 'Tue',
// 		key: 'Tue',
// 		render: (index, record) => {
// 			return record.weekdays.Tue;
// 		},
// 	},
// 	{
// 		title: 'Wed',
// 		dataIndex: 'Wed',
// 		key: 'Wed',
// 		render: (index, record) => {
// 			return record.weekdays.Wed;
// 		},
// 	},
// 	{
// 		title: 'Thu',
// 		dataIndex: 'Thu',
// 		key: 'Thu',
// 		render: (index, record) => {
// 			return record.weekdays.Thu;
// 		},
// 	},
// 	{
// 		title: 'Fri',
// 		dataIndex: 'Fri',
// 		key: 'Fri',
// 		render: (index, record) => {
// 			return record.weekdays.Fri;
// 		},
// 	},
// 	{
// 		title: 'Sat',
// 		dataIndex: 'Sat',
// 		key: 'Sat',
// 		render: (index, record) => {
// 			return record.weekdays.Sat;
// 		},
// 	},
// 	{
// 		title: 'Sun',
// 		dataIndex: 'Sun',
// 		key: 'Sun',
// 		render: (index, record) => {
// 			return record.weekdays.Sun;
// 		},
// 	},
// ];

interface RandomData {
	id: number;
	name: string;
	date: string;
	slot: number;
}

interface DoctorWeekCalendarProps {}

const DoctorWeekCalendar: React.FunctionComponent<DoctorWeekCalendarProps> = () => {
	const randomData: RandomData[] = [
		{ id: 1, name: 'Slot tư vấn bệnh nhân A', date: '2022-02-14', slot: 10 },
		{ id: 2, name: 'Slot tư vấn bệnh nhân B', date: '2022-02-16', slot: 15 },
		{ id: 3, name: 'Slot tư vấn bệnh nhân X', date: '2022-02-17', slot: 8 },
		{ id: 4, name: 'Slot tư vấn bệnh nhân Y', date: '2022-02-18', slot: 14 },
	];

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

	const events: DataType<RandomData>[] = randomData.map((item) => ({
		date: moment(item.date),
		slotId: item.slot,
		event: item,
		data: item,
	}));

	const [currentWeek, setCurrentWeek] = React.useState<Moment>(moment());

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Week Calendar
					</h2>

					<DatePicker onChange={(value) => setCurrentWeek(value || moment())} picker="week" />
					<WeeklyCalendar<RandomData>
						events={events}
						slots={slots}
						currentWeek={currentWeek.week()}
						onDisplayEvent={(event) => (
							<Button className="w-full font-medium text-gray-700 bg-green-300 border-none rounded-md hover:bg-green-500 hover:text-white">
								{event.name} tại Slot {event.slot}
							</Button>
						)}
					/>
				</div>
			</div>
		</>
	);
};

export default DoctorWeekCalendar;
