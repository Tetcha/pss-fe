import * as React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

import ChardCard from './ChartCard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ColumnChartProps {
	xAxis: string[];
	height?: number;
	width?: number;
	title?: string;
	series: ApexAxisChartSeries;
	colors?: string[];
}

export const ColumnChart: React.FunctionComponent<ColumnChartProps> = ({
	series,
	xAxis,
	height = 350,
	width = 500,
	title = '',
	colors = ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
}) => {
	const options = React.useMemo<ApexOptions>(
		() => ({
			chart: {
				height,
				type: 'bar',
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
				categories: xAxis,
			},
			colors,
		}),
		[series, xAxis],
	);

	return (
		<ChardCard>
			<Chart options={options} type={'bar'} series={series} width={width} height={height} />
		</ChardCard>
	);
};
