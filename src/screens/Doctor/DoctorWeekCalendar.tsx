import * as React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { WeeklyCalendar } from 'src/components/WeekCalendar';
import { Slot } from 'src/models/slot';
import { useQuery } from '@tanstack/react-query';
import { getSlots } from 'src/api/slot';
import moment from 'moment';

interface WeekDays {
	Mon: React.ReactNode;
	Tue: React.ReactNode;
	Wed: React.ReactNode;
	Thu: React.ReactNode;
	Fri: React.ReactNode;
	Sat: React.ReactNode;
	Sun: React.ReactNode;
}

interface DataType {
	key: React.Key;
	id: string;
	name: string;
	hours: string;
	date: string;
	slot: number;
	weekdays: WeekDays;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Hours',
		dataIndex: 'hours',
		key: 'hours',
		width: 120,
		className: 'bg-gray-50',
		render: (_, record) => <Space size="middle">{record.hours.toUpperCase()}</Space>,
	},
	{
		title: 'Mon',
		dataIndex: 'Mon',
		key: 'Mon',
		render: (index, record) => {
			return record.weekdays.Mon;
		},
	},
	{
		title: 'Tue',
		dataIndex: 'Tue',
		key: 'Tue',
		render: (index, record) => {
			return record.weekdays.Tue;
		},
	},
	{
		title: 'Wed',
		dataIndex: 'Wed',
		key: 'Wed',
		render: (index, record) => {
			return record.weekdays.Wed;
		},
	},
	{
		title: 'Thu',
		dataIndex: 'Thu',
		key: 'Thu',
		render: (index, record) => {
			return record.weekdays.Thu;
		},
	},
	{
		title: 'Fri',
		dataIndex: 'Fri',
		key: 'Fri',
		render: (index, record) => {
			return record.weekdays.Fri;
		},
	},
	{
		title: 'Sat',
		dataIndex: 'Sat',
		key: 'Sat',
		render: (index, record) => {
			return record.weekdays.Sat;
		},
	},
	{
		title: 'Sun',
		dataIndex: 'Sun',
		key: 'Sun',
		render: (index, record) => {
			return record.weekdays.Sun;
		},
	},
];

// const data: DataType[] = [
// 	{ key: '1', id: '1', name: 'Event 1', date: '2022-02-14', slot: 10 },
// 	{ key: '2', id: '2', name: 'Event 2', date: '2022-02-16', slot: 15 },
// 	{ key: '3', id: '3', name: 'Event 3', date: '2022-02-17', slot: 8 },
// 	{ key: '4', id: '4', name: 'Event 4', date: '2022-02-18', slot: 14 },
// 	{ key: '5', id: '5', name: 'Event 5', date: '2022-02-21', slot: 9 },
// 	{ key: '6', id: '6', name: 'Event 6', date: '2022-02-22', slot: 16 },
// 	{ key: '7', id: '7', name: 'Event 7', date: '2022-02-25', slot: 11 },
// 	{ key: '8', id: '8', name: 'Event 8', date: '2022-02-21', slot: 12 },
// 	{ key: '9', id: '9', name: 'Event 9', date: '2022-02-22', slot: 15 },
// ];

interface DateData {
	id: number;
	name: string;
	date: string;
	slot: number;
}

interface DoctorWeekCalendarProps {}

const DoctorWeekCalendar: React.FunctionComponent<DoctorWeekCalendarProps> = () => {
	const [currentWeek, setCurrentWeek] = React.useState(0);
	const [tableData, setTableData] = React.useState<DataType[]>([]);

	const dateData: DateData[] = [
		{ id: 1, name: 'Event 1', date: '2022-02-14', slot: 10 },
		{ id: 2, name: 'Event 2', date: '2022-02-16', slot: 15 },
		{ id: 3, name: 'Event 3', date: '2022-02-17', slot: 8 },
		{ id: 4, name: 'Event 4', date: '2022-02-18', slot: 14 },
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

	React.useEffect(() => {
		console.log('dateDate', tableData);
	}, [tableData]);

	React.useEffect(() => {
		const tableData: DataType[] = querySlots.data.map((slot) => {
			const date = moment().isoWeekday(1).add(currentWeek, 'week').format('YYYY-MM-DD');
			const slotId = slot.id;
			const slotName = slot.name;
			const slotStartTime = slot.startTime;
			const slotHours = `${slotStartTime}`;
			const slotDate = date;
			const slotKey = `${slotId}-${date}`;

			const weekdays: WeekDays = {
				Mon: filterSlotByWeekday(dateData, 1, slotId).map((item) => (
					<p key={item.id}>{item.name}</p>
				)),
				Tue: filterSlotByWeekday(dateData, 2, slotId).map((item) => (
					<p key={item.id}>{item.name}</p>
				)),
				Wed: filterSlotByWeekday(dateData, 3, slotId).map((item) => (
					<p key={item.id}>{item.name}</p>
				)),
				Thu: filterSlotByWeekday(dateData, 4, slotId).map((item) => (
					<p key={item.id}>{item.name}</p>
				)),
				Fri: filterSlotByWeekday(dateData, 5, slotId).map((item) => (
					<p key={item.id}>{item.name}</p>
				)),
				Sat: filterSlotByWeekday(dateData, 6, slotId).map((item) => (
					<p key={item.id}>{item.name}</p>
				)),
				Sun: filterSlotByWeekday(dateData, 7, slotId).map((item) => (
					<p key={item.id}>{item.name}</p>
				)),
			};

			return {
				key: slotKey,
				id: slotId.toString(),
				slot: slotId,
				name: slotName,
				hours: slotHours,
				date: slotDate,
				weekdays,
			};
		});
		setTableData(tableData);
	}, []);

	const filterSlotByWeekday = (data: DateData[], weekday: number, slotId: number) => {
		return data.filter(
			(item) => moment(item.date).isoWeekday() === weekday && item.slot === slotId,
		);
	};

	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Week Calendar
					</h2>
					<Table
						className="h-[1000px] overflow-y-auto"
						bordered={true}
						pagination={false}
						columns={columns}
						dataSource={tableData}
					/>
					{/* <WeeklyCalendar events={[]} /> */}
				</div>
			</div>
		</>
	);
};

export default DoctorWeekCalendar;
