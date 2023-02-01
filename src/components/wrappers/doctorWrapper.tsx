import * as React from 'react';

import { GetCurrentDoctorWrapper } from './getCurrentDoctorWrapper';
import { RouterProtectionAdminWrapper } from './routerProtectionAdminWrapper';

interface DoctorWrapperProps extends React.PropsWithChildren {}

export const DoctorWrapper: React.FunctionComponent<DoctorWrapperProps> = ({ children }) => {
	return (
		<GetCurrentDoctorWrapper>
			<RouterProtectionAdminWrapper>{children}</RouterProtectionAdminWrapper>
		</GetCurrentDoctorWrapper>
	);
};
