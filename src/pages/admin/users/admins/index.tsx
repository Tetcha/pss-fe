import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import AdminList from 'src/screens/Admin/Users/AdminList';

interface AdminListPageProps {}

const AdminListPage: React.FC<AdminListPageProps> = () => {
	return (
		<AdminWrapper>
			<AdminList />
		</AdminWrapper>
	);
};

export default AdminListPage;
