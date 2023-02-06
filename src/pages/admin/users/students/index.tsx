import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import Users from 'src/screens/Admin/Users';

interface StudentListPageProps {}

const StudentListPage: React.FC<StudentListPageProps> = () => {
	return (
		<AdminWrapper>
			<Users />
		</AdminWrapper>
	);
};

export default StudentListPage;
