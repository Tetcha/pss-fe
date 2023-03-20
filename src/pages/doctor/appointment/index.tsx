import { NextPage } from 'next';
import * as React from 'react';
import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
import DoctorAppointmentList from 'src/screens/Doctor/DoctorAppointmentList';
import DoctorAppointmentWeekCalendar from 'src/screens/Doctor/DoctorAppointmentWeekCalendar';

interface AppointmentPageProps {}

const AppointmentPage: NextPage<AppointmentPageProps> = () => {
	return (
		<DoctorWrapper>
			<TableUtilProvider>
				<DoctorAppointmentWeekCalendar />
			</TableUtilProvider>
		</DoctorWrapper>
	);
};

export default AppointmentPage;
