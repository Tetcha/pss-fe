import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import DoctorSlotsCalendar from 'src/screens/Doctor/DoctorSlotsCalendar';

interface DoctorCalendarPageProps {}

const DoctorSlotsCalendarPage: React.FunctionComponent<DoctorCalendarPageProps> = () => {
	return (
		<>
			<DoctorWrapper>
				<DoctorSlotsCalendar />
			</DoctorWrapper>
		</>
	);
};

export default DoctorSlotsCalendarPage;
