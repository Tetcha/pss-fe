import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import * as React from 'react';
import { getStudentBookingHistory } from 'src/api/booking';
import StatusTag from 'src/components/Common/StatusTag';
import { BookingHistoryListFilter } from 'src/interface/booking';
import { useStoreUser } from 'src/store';
import { pagingMapper } from 'src/utils/object.helper';

interface BookingHistoryProps {
	filters: Partial<BookingHistoryListFilter>;
}

const BookingHistory: React.FunctionComponent<BookingHistoryProps> = ({ filters }) => {
	const { id } = useStoreUser();

	const query = useQuery(
		['booking-history', filters, id],
		async () => {
			const newFilters = { ...filters, id };
			const res = await getStudentBookingHistory(pagingMapper(newFilters));
			return res.data;
		},
		{ initialData: { data: [], count: 0 } },
	);

	console.log('query', query.data);

	return (
		<>
			<div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
				<h3 className="text-xl text-gray-900 font-bold">Booking History</h3>
				<div className="relative px-4">
					{/* <div className="flex items-center w-full my-6 -ml-1.5">
						<div className="w-1/12 z-10"></div>
						<div className="w-11/12 flex justify-between items-center">
							<div className="text-sm">Date</div>
							<div className="text-sm">date</div>
							<div className="text-sm">cost</div>
							<div>status</div>
						</div>
					</div> */}
					<div className="absolute h-full border-[0.5px] border-solid border-opacity-80 border-secondary flex gap-y-4" />
					{query.data.data.map((item) => (
						<div className="flex items-center w-full my-6 -ml-1.5" key={item.id}>
							<div className="w-1/12 z-10">
								<div className="w-3.5 h-3.5 bg-blue-500 rounded-full" />
							</div>
							<div className="w-11/12 flex justify-between items-center">
								<div className="text-sm">{moment(item.slot.date).format('YYYY-MM-DD')}</div>
								<div className="text-sm">
									{item.slot.startTime} - {item.slot.endTime}
								</div>
								<div className="text-sm">{item.cost}</div>
								<div>
									<StatusTag value={item.status} key={item.id} />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default BookingHistory;
