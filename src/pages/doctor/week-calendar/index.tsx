import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import DoctorWeekCalendar from 'src/screens/Doctor/DoctorWeekCalendar';

interface DoctorWeekCalendarPageProps {}

const DoctorWeekCalendarPage: React.FunctionComponent<DoctorWeekCalendarPageProps> = () => {
	return (
		<>
			<DoctorWrapper>
				<DoctorWeekCalendar />
			</DoctorWrapper>
		</>
	);
};

export default DoctorWeekCalendarPage;
