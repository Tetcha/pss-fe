import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment, { Moment } from 'moment';
import * as React from 'react';

interface WeekDays {
	Mon: React.ReactNode;
	Tue: React.ReactNode;
	Wed: React.ReactNode;
	Thu: React.ReactNode;
	Fri: React.ReactNode;
	Sat: React.ReactNode;
	Sun: React.ReactNode;
}

interface TableType {
	key: React.Key;
	name: React.ReactNode;
	hour: string;
	date: string;
	weekdays: WeekDays;
}

const columns: ColumnsType<TableType> = [
	{
		title: 'Hours',
		dataIndex: 'hours',
		key: 'hours',
		width: 120,
		className: 'bg-gray-50',
		render: (_, record) => (
			<Space size="middle" className="font-medium">
				{record.hour.toUpperCase()}
			</Space>
		),
	},
	{
		title: 'Mon',
		dataIndex: 'Mon',
		key: 'Mon',
		render: (_, record) => {
			return record.weekdays.Mon;
		},
	},
	{
		title: 'Tue',
		dataIndex: 'Tue',
		key: 'Tue',
		render: (_, record) => {
			return record.weekdays.Tue;
		},
	},
	{
		title: 'Wed',
		dataIndex: 'Wed',
		key: 'Wed',
		render: (_, record) => {
			return record.weekdays.Wed;
		},
	},
	{
		title: 'Thu',
		dataIndex: 'Thu',
		key: 'Thu',
		render: (_, record) => {
			return record.weekdays.Thu;
		},
	},
	{
		title: 'Fri',
		dataIndex: 'Fri',
		key: 'Fri',
		render: (_, record) => {
			return record.weekdays.Fri;
		},
	},
	{
		title: 'Sat',
		dataIndex: 'Sat',
		key: 'Sat',
		render: (_, record) => {
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

export interface DataType<T> {
	event: T;
	date: Moment;
	slotId: unknown;
}

export interface SlotType {
	id: unknown;
	name: string;
	hour: string;
}

interface WeeklyCalendarProps<T> {
	events: DataType<T>[];
	slots: SlotType[];
	onDisplayEvent: (event: T) => React.ReactNode;
	currentWeek?: number;
}

/**
 * This is a component that displays a weekly calendar
 * @param {T} T - the type of the event
 * @param DateType<T> events - event only display if date of event in range the current week and correct slotId
 * @param {SlotType} slots - the slots of the calendar and make sure the id is unique
 * @param {Function} onDisplayEvent - the function to display the event return a ReactNode
 * @param {number} currentWeek - the current week of the calendar
 */

const WeeklyCalendar = <T,>({
	events,
	slots,
	currentWeek,
	onDisplayEvent,
}: WeeklyCalendarProps<T>) => {
	const [week, setWeek] = React.useState(currentWeek || moment().weeks());

	React.useEffect(() => {
		if (currentWeek) {
			setWeek(currentWeek);
		}
	}, [currentWeek]);

	const getEventByWeekDayAndSlot = React.useCallback(
		(weekday: number, slotId: unknown) => {
			return events.find((event) => {
				const { date: eventDate, slotId: eventSlotId } = event;
				const eventWeekday = moment(eventDate).weekday();
				return eventWeekday === weekday && eventSlotId === slotId && event.date.week() === week;
			});
		},
		[events, week],
	);

	const tableData = React.useMemo<TableType[]>(() => {
		const tableData = slots.map((slot: SlotType) => {
			const { id: slotId, name: slotName, hour } = slot;
			const weekdays: WeekDays = {
				Mon: null,
				Tue: null,
				Wed: null,
				Thu: null,
				Fri: null,
				Sat: null,
				Sun: null,
			};

			for (let i = 0; i < 7; i++) {
				const event = getEventByWeekDayAndSlot(i, slotId);
				if (event) {
					const { event: eventData } = event;
					const weekday = moment().weekday(i).format('ddd') as keyof WeekDays;
					weekdays[weekday] = onDisplayEvent(eventData);
				}
			}

			return {
				key: `${slotId}`,
				name: slotName,
				hour,
				date: moment().format('YYYY-MM-DD'),
				weekdays,
			};
		});

		return tableData;
	}, [slots, getEventByWeekDayAndSlot, onDisplayEvent]);

	const renderHeadRow = React.useCallback(
		(columns: ColumnsType<TableType>) => {
			const currentWeekday = moment().format('ddd: DD/MM');
			console.log('currentWeekday', currentWeekday);

			const columnsFormatWeekday = columns.map((column) => {
				switch (column.title) {
					case 'Mon':
						return {
							...column,
							title: moment().week(week).weekday(1).format('ddd: DD/MM'),
						};
					case 'Tue':
						return {
							...column,
							title: moment().week(week).weekday(2).format('ddd: DD/MM'),
						};
					case 'Wed':
						return {
							...column,
							title: moment().week(week).weekday(3).format('ddd: DD/MM'),
						};
					case 'Thu':
						return {
							...column,
							title: moment().week(week).weekday(4).format('ddd: DD/MM'),
						};
					case 'Fri':
						return {
							...column,
							title: moment().week(week).weekday(5).format('ddd: DD/MM'),
						};
					case 'Sat':
						return {
							...column,
							title: moment().week(week).weekday(6).format('ddd: DD/MM'),
						};
					case 'Sun':
						return {
							...column,
							title: moment().week(week).weekday(7).format('ddd: DD/MM'),
						};
					default:
						return column;
				}
			});

			const finaleColumns = columnsFormatWeekday.map((column) => {
				if (column.title === currentWeekday) {
					return {
						...column,
						className: 'bg-blue-50',
					};
				}
				return column;
			});

			return finaleColumns;
		},
		[week],
	);

	return (
		<Table
			sticky={true}
			className="relative overflow-y-auto h-[702px]"
			bordered={true}
			onHeaderRow={() => ({ className: 'bg-red-400' })}
			pagination={false}
			columns={renderHeadRow(columns)}
			dataSource={tableData}
		/>
	);
};

export default WeeklyCalendar;
