import * as React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

import { ChartData } from 'src/interface/chart';

import ChardCard from './ChartCard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AreaChartProps {
	height?: number;
	title?: string;
	width?: number;
	data: ChartData[][];
	name: string[];
}

export const AreaChart: React.FunctionComponent<AreaChartProps> = ({
	height = 350,
	width = 700,
	title = '',
	data,
	name,
}) => {
	const chartConfig = React.useMemo<{ options: ApexOptions; series: ApexAxisChartSeries }>(
		() => ({
			options: {
				chart: {
					height,
					type: 'line',
					zoom: {
						enabled: false,
					},
				},
				stroke: {
					curve: 'smooth',
				},
				title: {
					text: title,
					align: 'left',
				},
				grid: {
					row: {
						colors: ['#f3f3f3', 'transparent'],
						opacity: 0.5,
					},
				},
				xaxis: {
					categories: (data && data.length > 0 && data[0].map((item) => item.date)) || [],
				},
			},
			series: data.map((item, index) => ({
				data: item.map((a) => a.value),
				name: name[index],
			})),
		}),
		[data, name],
	);

	return (
		<ChardCard>
			<Chart
				options={chartConfig?.options}
				series={chartConfig?.series}
				width={width}
				height={height}
				type="area"
			/>
		</ChardCard>
	);
};
