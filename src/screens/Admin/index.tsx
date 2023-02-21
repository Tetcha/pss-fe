import * as React from 'react';
import { Col, Layout, Row } from 'antd';

import { AreaChart } from 'src/components/Chart/AreaChart';
import { ColumnChart } from 'src/components/Chart/ColumnChart';
import { LineChart } from 'src/components/Chart/LineChart';
import { PieChart } from 'src/components/Chart/PieChart';
import { ChartData } from 'src/interface/chart';

interface AdminProps {}

const Admin: React.FunctionComponent<AdminProps> = () => {
	const [newlyRegistered, setNewlyRegistered] = React.useState<ChartData[]>([
		{ date: '01-10-2023', value: 2 },
		{ date: '24-20-2023', value: 10 },
	]);

	const [newlyBooking, setNewlyBooking] = React.useState<ChartData[]>([
		{ date: '01-10-2023', value: 10 },
		{ date: '02-10-2023', value: 50 },
		{
			date: '03-10-2023',
			value: 20,
		},
		{
			date: '04-10-2023',
			value: 30,
		},
		{
			date: '05-10-2023',
			value: 10,
		},
		{
			date: '06-10-2023',
			value: 10,
		},
		{
			date: '07-10-2023',
			value: 10,
		},
		{
			date: '08-10-2023',
			value: 10,
		},
		{
			date: '09-10-2023',
			value: 10,
		},
		{
			date: '10-10-2023',
			value: 10,
		},
	]);

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
									data={[newlyRegistered]}
									title="New Register"
									width={420}
									height={280}
								/>
							</Col>
							<Col span={8}>
								<LineChart
									name={['Booking']}
									data={[newlyRegistered]}
									title="New booking"
									width={420}
									height={280}
								/>
							</Col>
							<Col span={8}>
								<LineChart
									name={['Profits']}
									data={[newlyRegistered]}
									title="Profits"
									width={420}
									height={280}
								/>
							</Col>
							<Col span={14}>
								<ColumnChart
									xAxis={newlyBooking.map((item) => item.date)}
									width={720}
									height={420}
									title="Booking"
									series={[
										{ name: 'Success', data: newlyBooking.map((item) => item.value) },
										{ name: 'Cancel', data: newlyBooking.map((item) => item.value) },
									]}
									colors={['#00E396', '#FF4560']}
								/>
							</Col>
							<Col span={10}>
								<PieChart
									labels={['Pending', 'Success', 'Cancel']}
									series={[2, 3, 1]}
									size={546}
									colors={['#FEB019', '#00E396', '#FF4560']}
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
