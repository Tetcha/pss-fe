import { VideoCameraOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Timeline } from 'antd';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { getStudentBookingHistory } from 'src/api/booking';
import StatusTag from 'src/components/Common/StatusTag';
import { ENV_VARIABLES } from 'src/constants/env';
import { BookingHistoryListFilter } from 'src/interface/booking';
import { ResponseList } from 'src/interface/common';
import { BookingHistory, BookingSlotStatus } from 'src/models/booking';
import { SortOrder } from 'src/models/interface';
import { useStoreUser } from 'src/store';
import { pagingMapper } from 'src/utils/object.helper';

interface BookingHistoryProps {
	filters: Partial<BookingHistoryListFilter>;
}

const BookingHistory: React.FunctionComponent<BookingHistoryProps> = ({ filters }) => {
	const { id } = useStoreUser();
	const userId = id;

	const query = useQuery<ResponseList<BookingHistory>>(
		['booking-history', filters, id],
		async () => {
			const filterProps: BookingHistoryListFilter = {
				orderBy: 'date',
				order: SortOrder.ASC,
				status: '',
				page: 0,
				pageSize: 100,
				id,
			};
			// const newFilters = { filterProps };
			const res = await getStudentBookingHistory(pagingMapper(filterProps));
			return res.data;
		},
		{ initialData: { data: [], count: 0 }, enabled: Boolean(id) },
	);

	const color = (item: BookingHistory) => {
		if (item.status === BookingSlotStatus.REJECTED) {
			return 'red';
		}

		const time = formatTime(item.slot.endTime, item.slot.date);

		const slot = time.minute(0).second(0);
		const current = moment().minute(0).second(0);

		if (moment(slot).isSame(current, 'hour')) {
			return 'green';
		}

		if (moment(slot).isAfter(current)) {
			return '#FFA500';
		}

		return 'blue';
	};

	const [token, setToken] = React.useState<string>('');

	React.useEffect(() => {
		const token = localStorage.getItem('access-token') || '';
		setToken(token);
	}, []);

	const formatTime = (hour: string, date: string) => {
		return moment(`${date} ${hour}`, 'YYYY-MM-DD hh:mm:ss A');
	};

	const compareTime = (time1: Moment, time2: Moment) => {
		if (time1.isBefore(time2)) {
			return 1;
		}
		if (time1.isAfter(time2)) {
			return -1;
		}
		return 0;
	};

	const formatColorToStatus = (color: string) => {
		switch (color) {
			case 'red':
				return BookingSlotStatus.REJECTED;
			case 'blue':
				return 'Completed';
			case 'green':
				return BookingSlotStatus.ACCEPTED;
			case '#FFA500':
				return 'Up Coming';
			default:
				return 'Completed';
		}
	};

	return (
		<>
			<div className="flex-1 p-4 bg-white rounded-lg shadow-xl lg:p-8">
				<h3 className="text-xl font-bold text-gray-900">Booking History</h3>
				<div className="relative px-4">
					<Timeline mode="left">
						{query.data.data
							.sort((a: BookingHistory, b: BookingHistory) =>
								compareTime(
									formatTime(a.slot.endTime, a.slot.date),
									formatTime(b.slot.endTime, b.slot.date),
								),
							)
							.map((item) => (
								<Timeline.Item
									color={color(item)}
									label={`${moment(item.slot.date).format(
										'YYYY-MM-DD',
									)} || ${item.slot.startTime.toUpperCase()} - ${item.slot.endTime.toUpperCase()}`}
									key={item.id}
								>
									<div className="flex items-center justify-between gap-x-2">
										<div className="text-sm font-semibold sm:text-base">
											{item.slot.doctor.name}
										</div>
										<div className="hidden text-base sm:flex">{item.slot.doctor.gender}</div>
										<div className="min-w-[120px] justify-start hidden sm:flex">
											<StatusTag value={formatColorToStatus(color(item))} key={item.id} />
											{color(item) === 'green' ? (
												<a
													href={`${ENV_VARIABLES.CALL_URL}/room/${item.id}?token=${token}`}
													className="flex items-center justify-center px-2 space-x-2 text-base transition duration-100 bg-blue-600 border-none rounded cursor-pointer hover:bg-blue-500"
												>
													<VideoCameraOutlined style={{ fontSize: '16px', color: '#fff' }} />
												</a>
											) : (
												<></>
											)}
										</div>
										<div className="flex sm:hidden">
											{color(item) === 'green' ? (
												<a
													href={`${ENV_VARIABLES.CALL_URL}/room/${item.id}?token=${token}`}
													className="flex items-center justify-center px-1 space-x-2 text-base transition duration-100 bg-blue-600 border-none rounded cursor-pointer hover:bg-blue-500"
												>
													<VideoCameraOutlined style={{ fontSize: '16px', color: '#fff' }} />
												</a>
											) : (
												<></>
											)}
										</div>
									</div>
								</Timeline.Item>
							))}
					</Timeline>
				</div>
			</div>
		</>
	);
};

export default BookingHistory;
