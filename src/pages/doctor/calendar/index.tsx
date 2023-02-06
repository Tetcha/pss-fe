import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import DoctorCalendar from 'src/screens/Doctor/DoctorCalendar';

interface DoctorCalendarPageProps {}

const DoctorCalendarPage: React.FunctionComponent<DoctorCalendarPageProps> = () => {
	return (
		<>
			<DoctorWrapper>
				<DoctorCalendar />
			</DoctorWrapper>
		</>
	);
};

export default DoctorCalendarPage;
