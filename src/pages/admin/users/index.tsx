import * as React from 'react';
import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import Users from 'src/screens/Admin/Users';

interface UsersPageProps {}

const UsersPage: React.FunctionComponent<UsersPageProps> = () => {
	return (
		<AdminWrapper>
			<Users />
		</AdminWrapper>
	);
};

export default UsersPage;
