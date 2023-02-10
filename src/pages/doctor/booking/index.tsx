import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import BookingList from 'src/screens/Doctor/BookingList';

interface DoctorCalendarPageProps {}

const DoctorCalendarPage: React.FunctionComponent<DoctorCalendarPageProps> = () => {
	return (
		<>
			<DoctorWrapper>
				<BookingList />
			</DoctorWrapper>
		</>
	);
};

export default DoctorCalendarPage;
