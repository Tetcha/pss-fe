import { VideoCameraOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Timeline } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { getStudentBookingHistory } from 'src/api/booking';
import StatusTag from 'src/components/Common/StatusTag';
import { BookingHistoryListFilter } from 'src/interface/booking';
import { BookingSlotStatus } from 'src/models/booking';
import { SortOrder } from 'src/models/interface';
import { useStoreUser } from 'src/store';
import { pagingMapper } from 'src/utils/object.helper';

interface BookingHistoryProps {
	filters: Partial<BookingHistoryListFilter>;
}

const BookingHistory: React.FunctionComponent<BookingHistoryProps> = ({ filters }) => {
	const { id } = useStoreUser();
	const userId = id;

	const query = useQuery(
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
		{ initialData: { data: [], count: 0 } },
	);

	console.log('query', query.data);

	const color = (item: any) => {
		if (item === BookingSlotStatus.ACCEPTED) {
			return 'green';
		} else if (item === BookingSlotStatus.PENDING) {
			return 'blue';
		} else if (item === BookingSlotStatus.REJECTED) {
			return 'red';
		}
	};

	return (
		<>
			<div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-4 lg:p-8">
				<h3 className="text-xl text-gray-900 font-bold">Booking History</h3>
				<div className="relative px-4">
					<Timeline mode="left">
						{query.data.data
							.sort(
								(a: any, b: any) =>
									new Date(b.slot.date).getTime() - new Date(a.slot.date).getTime(),
							)
							.map((item) => (
								<Timeline.Item
									color={color(item.status)}
									label={`${moment(item.slot.date).format('YYYY-MM-DD')} || ${
										item.slot.startTime
									} - ${item.slot.endTime}`}
									key=""
								>
									<div className="flex justify-between gap-x-2 items-center">
										<div className="text-sm sm:text-base font-semibold">
											{item.slot.doctor.name}
										</div>
										<div className="text-base hidden sm:flex">{item.slot.doctor.gender}</div>
										<div className="text-base hidden sm:flex">Question</div>
										<div className="min-w-[120px] justify-start hidden sm:flex">
											<StatusTag value={item.status} key={item.id} />
											{item.status === BookingSlotStatus.ACCEPTED ? (
												<a
													href={`https://localhost:3001/room/${item.id}`}
													className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 px-2 rounded text-base space-x-2 transition duration-100 cursor-pointer border-none"
												>
													<VideoCameraOutlined style={{ fontSize: '16px', color: '#fff' }} />
												</a>
											) : (
												<></>
											)}
										</div>
										<div className="flex sm:hidden">
											{item.status === BookingSlotStatus.ACCEPTED ? (
												<a
													href={`https://localhost:3001/room/${item.id}`}
													className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 px-1 rounded text-base space-x-2 transition duration-100 cursor-pointer border-none"
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
