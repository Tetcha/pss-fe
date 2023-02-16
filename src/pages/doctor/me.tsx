import React from 'react';

import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import DoctorMe from 'src/screens/Doctor/DoctorMe';

interface DoctorMePageProps {}

const DoctorMePage: React.FunctionComponent<DoctorMePageProps> = () => {
	return (
		<>
			<DoctorWrapper>
				<DoctorMe />
			</DoctorWrapper>
		</>
	);
};

export default DoctorMePage;
