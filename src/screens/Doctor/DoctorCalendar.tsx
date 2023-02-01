import * as React from 'react';

import DashboardDoctorLayout from 'src/components/Doctor/Layout/DashboardDoctorLayout';

import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import { Moment } from 'moment';

const getListData = (value: Moment) => {
	let listData;
	switch (value.date()) {
		case 8:
			listData = [
				{ type: 'warning', content: 'This is warning event.' },
				{ type: 'success', content: 'This is usual event.' },
			];
			break;
		case 10:
			listData = [
				{ type: 'warning', content: 'This is warning event.' },
				{ type: 'success', content: 'This is usual event.' },
				{ type: 'error', content: 'This is error event.' },
			];
			break;
		case 15:
			listData = [
				{ type: 'warning', content: 'This is warning event' },
				{ type: 'success', content: 'This is very long usual event。。....' },
				{ type: 'error', content: 'This is error event 1.' },
				{ type: 'error', content: 'This is error event 2.' },
				{ type: 'error', content: 'This is error event 3.' },
				{ type: 'error', content: 'This is error event 4.' },
			];
			break;
		default:
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

	return (
		<DashboardDoctorLayout>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Booking Calendar
					</h2>
				</div>
				<div className="flex mt-4 md:mt-0 md:ml-4">
					{/* <Link href={ROUTES_URL.DOCTOR_SLOT}> */}
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Slot Booking
					</button>
					{/* </Link> */}
				</div>
			</div>
			<Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
		</DashboardDoctorLayout>
	);
};

export default DoctorCalendar;
