import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import DoctorList from 'src/screens/Admin/Users/DoctorList';

interface AdminListPageProps {}

const AdminListPage: React.FC<AdminListPageProps> = () => {
	return (
		<AdminWrapper>
			<DoctorList />
		</AdminWrapper>
	);
};

export default AdminListPage;
