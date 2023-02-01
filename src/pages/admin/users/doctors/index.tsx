import * as React from 'react';
import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import Users from 'src/screens/Admin/Users';

interface DoctorsPageProps {}

const DoctorsPage: React.FC<DoctorsPageProps> = () => {
	return (
		<AdminWrapper>
			<Users />
		</AdminWrapper>
	);
};

export default DoctorsPage;
