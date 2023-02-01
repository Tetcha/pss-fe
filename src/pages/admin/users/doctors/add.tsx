import * as React from 'react';
import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import AddDoctor from 'src/screens/Admin/Users/AddDoctor';

interface AddDoctorPageProps {}

const AddDoctorPage: React.FunctionComponent<AddDoctorPageProps> = () => {
	return (
		<AdminWrapper>
			<AddDoctor />
		</AdminWrapper>
	);
};

export default AddDoctorPage;
