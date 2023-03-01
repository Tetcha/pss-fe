import * as React from 'react';
import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import DoctorAppointmentWeekCalendar from 'src/screens/Doctor/DoctorAppointmentWeekCalendar';

interface AppointmentPageProps {}

const AppointmentPage: React.FunctionComponent<AppointmentPageProps> = () => {
	return (
		<DoctorWrapper>
			<DoctorAppointmentWeekCalendar />
		</DoctorWrapper>
	);
};

export default AppointmentPage;
