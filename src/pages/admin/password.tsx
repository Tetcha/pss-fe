import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import AdminPassword from 'src/screens/Admin/AdminPassword';

interface AdminPasswordPageProps {}

const AdminPasswordPage: React.FunctionComponent<AdminPasswordPageProps> = () => {
	return (
		<AdminWrapper>
			<AdminPassword />
		</AdminWrapper>
	);
};

export default AdminPasswordPage;
