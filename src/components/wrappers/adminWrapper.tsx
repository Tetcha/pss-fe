import * as React from 'react';
import { GetCurrentAdminWrapper } from './getCurrentAdminWrapper';
import { RouterProtectionAdminWrapper } from './routerProtectionAdminWrapper';

interface AdminWrapperProps extends React.PropsWithChildren {}

export const AdminWrapper: React.FunctionComponent<AdminWrapperProps> = ({ children }) => {
	return (
		<GetCurrentAdminWrapper>
			<RouterProtectionAdminWrapper>{children}</RouterProtectionAdminWrapper>
		</GetCurrentAdminWrapper>
	);
};
