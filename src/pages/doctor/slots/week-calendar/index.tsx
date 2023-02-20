import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import DoctorSlotsWeekCalendar from 'src/screens/Doctor/DoctorSlotsWeekCalendar';

interface DoctorWeekCalendarPageProps {}

const DoctorWeekCalendarPage: React.FunctionComponent<DoctorWeekCalendarPageProps> = () => {
	return (
		<>
			<DoctorWrapper>
				<DoctorSlotsWeekCalendar />
			</DoctorWrapper>
		</>
	);
};

export default DoctorWeekCalendarPage;
