import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

import ChardCard from './ChartCard';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PieChartProps {
	series: number[];
	labels: string[];
	size?: number;
	title?: string;
	colors?: string[];
}

export const PieChart: React.FunctionComponent<PieChartProps> = ({
	labels,
	series,
	size = 380,
	title,
	colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
}) => {
	const [options, setOptions] = React.useState<ApexOptions>({
		chart: {
			type: 'pie',
		},
		title: {
			text: title,
			align: 'left',
		},
		labels,
		colors,
	});

	return (
		<ChardCard>
			{series?.length && (
				<Chart options={options} series={series} type="pie" width={size} height={size} />
			)}
		</ChardCard>
	);
};
