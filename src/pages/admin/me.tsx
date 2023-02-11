import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import AdminMe from 'src/screens/Admin/AdminMe';

interface AdminMePageProps {}

const AdminMePage: React.FunctionComponent<AdminMePageProps> = () => {
	return (
		<AdminWrapper>
			<AdminMe />
		</AdminWrapper>
	);
};

export default AdminMePage;
