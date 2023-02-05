import * as React from 'react';

import { GetCurrentUserWrapper } from './getCurrentUserWrapper';
import { RouterProtectionWrapper } from './routerProtectionWrapper';

interface AdminWrapperProps extends React.PropsWithChildren {}

export const AdminWrapper: React.FunctionComponent<AdminWrapperProps> = ({ children }) => {
	return (
		<GetCurrentUserWrapper>
			<RouterProtectionWrapper>{children}</RouterProtectionWrapper>
		</GetCurrentUserWrapper>
	);
};
