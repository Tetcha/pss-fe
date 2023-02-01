import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import Admin from 'src/screens/Admin';

interface AdminPageProps {}

const AdminPage: React.FunctionComponent<AdminPageProps> = () => {
	return (
		<AdminWrapper>
			<Admin />
		</AdminWrapper>
	);
};

export default AdminPage;
