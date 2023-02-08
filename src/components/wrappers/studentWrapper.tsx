import * as React from 'react';

import { GetCurrentUserWrapper } from './getCurrentUserWrapper';
import { RouterProtectionWrapper } from './routerProtectionWrapper';

interface StudentWrapperProps extends React.PropsWithChildren {}

export const StudentWrapper: React.FunctionComponent<StudentWrapperProps> = ({ children }) => {
	return (
		<GetCurrentUserWrapper>
			<RouterProtectionWrapper>{children}</RouterProtectionWrapper>
		</GetCurrentUserWrapper>
	);
};
