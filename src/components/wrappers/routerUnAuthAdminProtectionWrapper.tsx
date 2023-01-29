import * as React from 'react';
import { useRouter } from 'next/router';

import { useStoreAdmin } from 'src/store';
import { ROUTES_URL } from 'src/constants/routes';

interface RouterUnAuthAdminProtectionWrapperProps extends React.PropsWithChildren {}

export const RouterUnAuthAdminProtectionWrapper: React.FC<
	RouterUnAuthAdminProtectionWrapperProps
> = ({ children }) => {
	const admin = useStoreAdmin();
	const router = useRouter();

	React.useEffect(() => {
		if (admin.isLogin && admin.id) {
			router.push(ROUTES_URL.ADMIN);
		}
	}, [admin, router]);

	return <>{children}</>;
};
