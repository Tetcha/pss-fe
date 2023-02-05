import * as React from 'react';

import { GetCurrentDoctorWrapper } from './getCurrentDoctorWrapper';
import { RouterProtectionDoctorWrapper } from './routerProtectionDoctorWrapper';

interface DoctorWrapperProps extends React.PropsWithChildren {}

export const DoctorWrapper: React.FunctionComponent<DoctorWrapperProps> = ({ children }) => {
	return (
		<GetCurrentDoctorWrapper>
			<RouterProtectionDoctorWrapper>{children}</RouterProtectionDoctorWrapper>
		</GetCurrentDoctorWrapper>
	);
};
