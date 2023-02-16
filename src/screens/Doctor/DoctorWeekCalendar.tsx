import * as React from 'react';
import { Moment } from 'moment';

const events = [
	{
		eventId: '1',
		startTime: new Date(2021, 3, 21, 12, 0, 0),
		endTime: new Date(2021, 3, 21, 14, 30, 0),
		title: 'Ap. 1',
		backgroundColor: 'red',
	},
	{
		eventId: '2',
		startTime: new Date(2021, 3, 25, 10, 0, 0),
		endTime: new Date(2021, 3, 25, 17, 15, 0),
		title: 'Ap. 1',
	},
];

interface DoctorWeekCalendarProps {}

const DoctorWeekCalendar: React.FunctionComponent<DoctorWeekCalendarProps> = () => {
	return (
		<>
			<div className="py-4 md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Week Calendar
					</h2>
				</div>
			</div>
		</>
	);
};

export default DoctorWeekCalendar;
