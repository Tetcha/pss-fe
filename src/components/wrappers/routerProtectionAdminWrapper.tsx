import * as React from 'react';
import { useRouter } from 'next/router';

import { ROUTES_URL } from 'src/constants/routes';
import { useStoreAdmin } from 'src/store';

interface RouterProtectionAdminWrapperProps extends React.PropsWithChildren {}

export const RouterProtectionAdminWrapper: React.FC<RouterProtectionAdminWrapperProps> = ({
	children,
}) => {
	const admin = useStoreAdmin();
	const router = useRouter();

	React.useEffect(() => {
		if (admin.isLogin && !admin.id) {
			router.push(`${ROUTES_URL.ADMIN_LOGIN}`);
		}
	}, [admin, router]);

	return <>{children}</>;
};
