import * as React from 'react';
import { useRouter } from 'next/router';

import { constant } from 'src/constants/api/token';
import { ROUTES_URL } from 'src/constants/routes';
import { useStoreUser } from 'src/store';

interface RouterProtectionWrapperProps extends React.PropsWithChildren {}

export const RouterProtectionWrapper: React.FC<RouterProtectionWrapperProps> = ({ children }) => {
	// const user = useStoreUser();
	const router = useRouter();

	React.useEffect(() => {
		const token = localStorage.getItem(constant.TOKEN_KEY);
		if (!token) {
			router.push(ROUTES_URL.STUDENT_LOGIN);
		}
	}, []);

	return <>{children}</>;
};
