import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import Transaction from 'src/screens/Admin/Transaction';

interface DoctorTransactionPageProps {}

const DoctorTransactionPage: React.FunctionComponent<DoctorTransactionPageProps> = () => {
	return (
		<>
			<DoctorWrapper>
				<Transaction />
			</DoctorWrapper>
		</>
	);
};

export default DoctorTransactionPage;
