import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import Users from 'src/screens/Admin/Users';
import DoctorList from 'src/screens/Admin/Users/DoctorList';

interface DoctorListPageProps {}

const DoctorListPage: React.FC<DoctorListPageProps> = () => {
	return (
		<AdminWrapper>
			<DoctorList />
		</AdminWrapper>
	);
};

export default DoctorListPage;
