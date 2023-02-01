import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import Doctor from 'src/screens/Doctor';

interface AdminPageProps {}

const AdminPage: React.FunctionComponent<AdminPageProps> = () => {
	return (
		<>
			<DoctorWrapper>
				<Doctor />
			</DoctorWrapper>
		</>
	);
};

export default AdminPage;
