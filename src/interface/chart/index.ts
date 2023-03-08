export interface ChartData {
	value: number;
	date: string;
}

export interface ChartPieStatus {
	pendingBooking: number;
	acceptedBooking: number;
	rejectedBooking: number;
}

export interface ColumnChartData {
	status: ChartPieStatus;
	date: string;
}
