import React from 'react';
import { useRouter } from 'next/router';

import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';

interface AdminPageProps {}

const AdminPage: React.FunctionComponent<AdminPageProps> = () => {
	const router = useRouter();
	React.useEffect(() => {
		router.push('/doctor/calendar');
	}, []);
	return (
		<>
			<DoctorWrapper></DoctorWrapper>
		</>
	);
};

export default AdminPage;
