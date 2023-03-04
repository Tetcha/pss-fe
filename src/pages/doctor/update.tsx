import React from 'react';

import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import DoctorUpdate from 'src/screens/Doctor/DoctorUpdate';

interface DoctorUpdatePageProps {}

const DoctorUpdatePage: React.FunctionComponent<DoctorUpdatePageProps> = () => {
	return (
		<>
			<DoctorWrapper>
				<DoctorUpdate />
			</DoctorWrapper>
		</>
	);
};

export default DoctorUpdatePage;
