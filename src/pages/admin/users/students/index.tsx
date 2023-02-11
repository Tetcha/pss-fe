import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import StudentList from 'src/screens/Admin/Users/StudentList';

interface StudentListPageProps {}

const StudentListPage: React.FC<StudentListPageProps> = () => {
	return (
		<AdminWrapper>
			<StudentList />
		</AdminWrapper>
	);
};

export default StudentListPage;
