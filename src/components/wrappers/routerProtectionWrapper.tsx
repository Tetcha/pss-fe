import * as React from 'react';
import { useRouter } from 'next/router';

import { ROUTES_URL } from 'src/constants/routes';
import { useStoreUser } from 'src/store';

interface RouterProtectionWrapperProps extends React.PropsWithChildren {}

export const RouterProtectionWrapper: React.FC<RouterProtectionWrapperProps> = ({ children }) => {
	const user = useStoreUser();
	const router = useRouter();

	React.useEffect(() => {
		if (user.isLogin && !user.id) {
			router.push(`${ROUTES_URL.STUDENT_LOGIN}`);
		}
	}, [user, router]);

	return <>{children}</>;
};
