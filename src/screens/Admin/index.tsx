import * as React from 'react';
import { Col, Layout, Row } from 'antd';

import { AreaChart } from 'src/components/Chart/AreaChart';
import { ColumnChart } from 'src/components/Chart/ColumnChart';
import { LineChart } from 'src/components/Chart/LineChart';
import { PieChart } from 'src/components/Chart/PieChart';
import { ChartData, ChartPieStatus, ColumnChartData } from 'src/interface/chart';
import { useQueries, useQuery } from '@tanstack/react-query';
import { http } from 'src/config/axios';
import moment from 'moment';
import _get from 'lodash.get';

interface AdminProps {}

const Admin: React.FunctionComponent<AdminProps> = () => {
	const dates = {
		lastMonth: {
			startDate: moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
			endDate: moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
			present: moment().subtract(1, 'month').format('MMMM'),
		},
		thisMonth: {
			startDate: moment().startOf('month').format('YYYY-MM-DD'),
			endDate: moment().endOf('month').format('YYYY-MM-DD'),
			present: moment().format('MMMM'),
		},
		thisWeek: {
			startDate: moment().startOf('week').format('YYYY-MM-DD'),
			endDate: moment().endOf('week').format('YYYY-MM-DD'),
		},
		week: {
			startDate: moment().subtract(6, 'days').format('YYYY-MM-DD'),
			endDate: moment().format('YYYY-MM-DD'),
		},
	};

	const queriesProfits = useQueries({
		queries: [
			{
				queryKey: ['profits-last-month'],
				queryFn: async () => {
					const { startDate, endDate } = dates.lastMonth;

					const { data } = await http.get('/profix', {
						params: {
							startDate,
							endDate,
						},
					});

					return data.profix;
				},
				enabled: Boolean(dates),
				initialData: 0,
			},
			{
				queryKey: ['profits-this-month'],
				queryFn: async () => {
					const { startDate, endDate } = dates.thisMonth;

					const { data } = await http.get('/profix', {
						params: {
							startDate,
							endDate,
						},
					});

					return data.profix;
				},
				enabled: Boolean(dates),
				initialData: 0,
			},
		],
	});

	const profits: ChartData[] = [
		{
			date: dates.lastMonth.present,

			value: queriesProfits[0].data,
		},
		{
			date: dates.thisMonth.present,
			value: queriesProfits[1].data,
		},
	];

	const queriesNewlyRegistered = useQueries({
		queries: [
			{
				queryKey: ['register-last-month'],
				queryFn: async () => {
					const { startDate, endDate } = dates.lastMonth;

					const { data } = await http.get('/students/register', {
						params: {
							startDate,
							endDate,
						},
					});

					return data.count;
				},
				enabled: Boolean(dates),
				initialData: 0,
			},
			{
				queryKey: ['register-this-month'],
				queryFn: async () => {
					const { startDate, endDate } = dates.thisMonth;

					const { data } = await http.get('/students/register', {
						params: {
							startDate,
							endDate,
						},
					});

					return data.count;
				},
				enabled: Boolean(dates),
				initialData: 0,
			},
		],
	});

	const newlyRegisteredData: ChartData[] = [
		{
			date: dates.lastMonth.present,
			value: queriesNewlyRegistered[0].data,
		},
		{
			date: dates.thisMonth.present,
			value: queriesNewlyRegistered[1].data,
		},
	];

	const queriesNewlyBooking = useQueries({
		queries: [
			{
				queryKey: ['bookings-last-month'],
				queryFn: async () => {
					const { startDate, endDate } = dates.lastMonth;

					const { data } = await http.get('/bookings/dashboard', {
						params: {
							startDate,
							endDate,
						},
					});

					return data.count;
				},
				enabled: Boolean(dates),
				initialData: 0,
			},
			{
				queryKey: ['bookings-this-month'],
				queryFn: async () => {
					const { startDate, endDate } = dates.thisMonth;

					const { data } = await http.get('/bookings/dashboard', {
						params: {
							startDate,
							endDate,
						},
					});

					return data.count;
				},
				enabled: Boolean(dates),
				initialData: 0,
			},
		],
	});

	const newlyBookingData: ChartData[] = [
		{
			date: dates.lastMonth.present,
			value: queriesNewlyBooking[0].data,
		},
		{
			date: dates.thisMonth.present,
			value: queriesNewlyBooking[1].data,
		},
	];

	const queryPieStatus = useQuery<ChartPieStatus>(
		['pie-status'],
		async () => {
			const { endDate, startDate } = dates.thisWeek;

			const { data } = await http.get<ChartPieStatus>('/bookings/dashboard/status', {
				params: {
					startDate,
					endDate,
				},
			});

			return data;
		},
		{
			initialData: { acceptedBooking: 0, pendingBooking: 0, rejectedBooking: 0 } as ChartPieStatus,
		},
	);

	const pieStatus = [
		{
			type: 'Accepted',
			value: queryPieStatus.data.acceptedBooking,
			color: '#00E396',
		},
		{
			type: 'Pending',
			value: queryPieStatus.data.pendingBooking,
			color: '#FFBB28',
		},
		{
			type: 'Rejected',
			value: queryPieStatus.data.rejectedBooking,
			color: '#FF4560',
		},
	];

	const queryColumnStatus = useQuery<ColumnChartData[]>(
		['column-status'],
		async () => {
			const { endDate, startDate } = dates.week;

			const { data } = await http.get<ColumnChartData[]>('/bookings/dashboard/status-by-day', {
				params: {
					startDate,
					endDate,
				},
			});

			const newData = data.map((item) => ({
				status: item.status,
				date: moment(item.date).format('ddd'),
			}));

			return newData;
		},
		{
			initialData: [] as ColumnChartData[],
		},
	);

	return (
		<>
			<Layout>
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Dashboard
					</h2>
				</div>
				<Row justify="center">
					<Col span={24}>
						<Row
							gutter={[
								{ xl: 16, lg: 8 },
								{ xl: 16, lg: 8 },
							]}
						>
							<Col span={8}>
								<LineChart
									name={['Register']}
									data={[newlyRegisteredData]}
									title="New Register"
									width={420}
									height={280}
								/>
							</Col>
							<Col span={8}>
								<LineChart
									name={['Booking']}
									data={[newlyBookingData]}
									title="New booking"
									width={420}
									height={280}
								/>
							</Col>
							<Col span={8}>
								<LineChart
									name={['Profits']}
									data={[profits]}
									title="Profits"
									width={420}
									height={280}
								/>
							</Col>
							<Col span={14}>
								<ColumnChart
									xAxis={queryColumnStatus.data.map((item) => item.date)}
									width={720}
									height={420}
									title="Booking"
									series={[
										{
											name: 'Pending',
											data: queryColumnStatus.data.map((item) => item.status.pendingBooking),
										},
										{
											name: 'Accepted',
											data: queryColumnStatus.data.map((item) => item.status.acceptedBooking),
										},
										{
											name: 'Rejected',
											data: queryColumnStatus.data.map((item) => item.status.rejectedBooking),
										},
									]}
									colors={['#FFBB28', '#00E396', '#FF4560']}
								/>
							</Col>
							<Col span={10}>
								<PieChart
									labels={pieStatus.map((item) => item.type)}
									series={pieStatus.map((item) => item.value)}
									size={546}
									colors={pieStatus.map((item) => item.color)}
									title="Booking status"
								/>
							</Col>
							<Col span={24}>
								<AreaChart
									name={['Abuse', 'Love', 'Hate', 'Sad', 'Serious illness', 'Other']}
									data={[
										[
											{ date: '01-10-2023', value: 2 },
											{ date: '08-20-2023', value: 5 },
											{ date: '16-20-2023', value: 10 },
											{ date: '24-20-2023', value: 2 },
										],
										[
											{ date: '01-10-2023', value: 4 },
											{ date: '08-20-2023', value: 7 },
											{ date: '16-20-2023', value: 9 },
											{ date: '24-20-2023', value: 20 },
										],
										[
											{ date: '01-10-2023', value: 4 },
											{ date: '08-20-2023', value: 10 },
											{ date: '16-20-2023', value: 24 },
											{ date: '24-20-2023', value: 6 },
										],
										[
											{ date: '01-10-2023', value: 20 },
											{ date: '08-20-2023', value: 9 },
											{ date: '16-20-2023', value: 4 },
											{ date: '24-20-2023', value: 24 },
										],
										[
											{ date: '01-10-2023', value: 10 },
											{ date: '08-20-2023', value: 12 },
											{ date: '16-20-2023', value: 14 },
											{ date: '24-20-2023', value: 16 },
										],
										[
											{ date: '01-10-2023', value: 3 },
											{ date: '08-20-2023', value: 2 },
											{ date: '16-20-2023', value: 1 },
											{ date: '24-20-2023', value: 14 },
										],
									]}
									width={1200}
									height={520}
									title="Symbol trends"
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</Layout>
		</>
	);
};

export default Admin;
