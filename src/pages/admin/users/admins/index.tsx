import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
import AdminList from 'src/screens/Admin/Users/AdminList';

interface AdminListPageProps {}

const AdminListPage: React.FC<AdminListPageProps> = () => {
	return (
		<AdminWrapper>
			<TableUtilProvider>
				<AdminList />
			</TableUtilProvider>
		</AdminWrapper>
	);
};

export default AdminListPage;
