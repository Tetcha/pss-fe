import React from 'react';
import { useRouter } from 'next/router';

import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import { ROUTES_URL } from 'src/constants/routes';

interface DoctorPageProps {}

const DoctorPage: React.FunctionComponent<DoctorPageProps> = () => {
	const router = useRouter();
	React.useEffect(() => {
		router.push(ROUTES_URL.DOCTOR_BOOKING);
	}, []);
	return (
		<>
			<DoctorWrapper></DoctorWrapper>
		</>
	);
};

export default DoctorPage;
